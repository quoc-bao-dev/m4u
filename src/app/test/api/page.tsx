'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '@/core/http/axiosInstance'

// Domain configuration
const DOMAIN_CONFIG = {
  default: '', // Will use axiosInstance default baseURL
  local: 'http://localhost:3000',
  development: 'https://dev-api.example.com',
  staging: 'https://staging-api.example.com',
  production: 'https://api.example.com',
  custom: '',
}

interface ApiResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

interface SavedApiCall {
  id: string
  timestamp: string
  method: string
  path: string
  requestBody?: string
  params?: Record<string, string>
  domain: string
  response: ApiResponse
}

interface KeyValuePair {
  key: string
  value: string
}

export default function ApiTestPage() {
  const [apiPath, setApiPath] = useState('')
  const [method, setMethod] = useState<
    'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  >('GET')
  const [requestBody, setRequestBody] = useState('')
  const [params, setParams] = useState<KeyValuePair[]>([{ key: '', value: '' }])
  const [bodyFields, setBodyFields] = useState<KeyValuePair[]>([
    { key: '', value: '' },
  ])
  const [useJsonBody, setUseJsonBody] = useState(false)
  const [selectedDomain, setSelectedDomain] =
    useState<keyof typeof DOMAIN_CONFIG>('default')
  const [customDomain, setCustomDomain] = useState('')
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedCalls, setSavedCalls] = useState<SavedApiCall[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [selectedHistory, setSelectedHistory] = useState<SavedApiCall | null>(
    null
  )
  const [showResponseDetail, setShowResponseDetail] = useState<string | null>(
    null
  )

  // Load saved calls from sessionStorage on component mount
  useEffect(() => {
    const saved = sessionStorage.getItem('apiTestHistory')
    if (saved) {
      setSavedCalls(JSON.parse(saved))
    }
  }, [])

  // Save calls to sessionStorage whenever savedCalls changes
  useEffect(() => {
    sessionStorage.setItem('apiTestHistory', JSON.stringify(savedCalls))
  }, [savedCalls])

  const handleSaveResponse = () => {
    if (!response) return

    const newCall: SavedApiCall = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('vi-VN'),
      method,
      path: apiPath,
      requestBody: useJsonBody ? requestBody : convertToJsonString(bodyFields),
      params: convertToObject(params),
      domain: getCurrentBaseURL(),
      response,
    }

    setSavedCalls((prev) => [newCall, ...prev])
  }

  const handleLoadHistory = (call: SavedApiCall) => {
    setMethod(call.method as any)
    setApiPath(call.path)
    setRequestBody(call.requestBody || '')
    setResponse(call.response)
    setError(null)
    setSelectedHistory(call)

    // Load params
    if (call.params) {
      const paramPairs = Object.entries(call.params).map(([key, value]) => ({
        key,
        value,
      }))
      setParams(paramPairs.length > 0 ? paramPairs : [{ key: '', value: '' }])
    } else {
      setParams([{ key: '', value: '' }])
    }
  }

  const handleDeleteHistory = (id: string) => {
    setSavedCalls((prev) => prev.filter((call) => call.id !== id))
    if (selectedHistory?.id === id) {
      setSelectedHistory(null)
    }
  }

  const handleClearHistory = () => {
    setSavedCalls([])
    setSelectedHistory(null)
  }

  // Helper functions for key-value pairs
  const addKeyValuePair = (type: 'params' | 'body') => {
    if (type === 'params') {
      setParams([...params, { key: '', value: '' }])
    } else {
      setBodyFields([...bodyFields, { key: '', value: '' }])
    }
  }

  const updateKeyValuePair = (
    type: 'params' | 'body',
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    if (type === 'params') {
      const newParams = [...params]
      newParams[index][field] = value
      setParams(newParams)
    } else {
      const newBodyFields = [...bodyFields]
      newBodyFields[index][field] = value
      setBodyFields(newBodyFields)
    }
  }

  const removeKeyValuePair = (type: 'params' | 'body', index: number) => {
    if (type === 'params') {
      if (params.length > 1) {
        setParams(params.filter((_, i) => i !== index))
      }
    } else {
      if (bodyFields.length > 1) {
        setBodyFields(bodyFields.filter((_, i) => i !== index))
      }
    }
  }

  const convertToObject = (pairs: KeyValuePair[]): Record<string, string> => {
    return pairs.reduce((acc, pair) => {
      if (pair.key.trim()) {
        acc[pair.key] = pair.value
      }
      return acc
    }, {} as Record<string, string>)
  }

  const convertToJsonString = (pairs: KeyValuePair[]): string => {
    const obj = convertToObject(pairs)
    return JSON.stringify(obj, null, 2)
  }

  // Get current base URL based on selected domain
  const getCurrentBaseURL = () => {
    if (selectedDomain === 'custom') {
      return customDomain || '/'
    }
    if (selectedDomain === 'default') {
      return axiosInstance.defaults.baseURL || '/'
    }
    return DOMAIN_CONFIG[selectedDomain] || '/'
  }

  const handleSendRequest = async () => {
    if (!apiPath.trim()) {
      setError('Vui lòng nhập API path')
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      let axiosResponse
      const queryParams = convertToObject(params)
      const bodyData = useJsonBody
        ? requestBody
          ? JSON.parse(requestBody)
          : undefined
        : convertToObject(bodyFields)

      // Use axios instance directly if default, otherwise create temporary instance
      let tempAxios = axiosInstance
      if (selectedDomain !== 'default') {
        const baseURL = getCurrentBaseURL()
        tempAxios = axiosInstance.create
          ? axiosInstance.create()
          : axiosInstance
        if (tempAxios.defaults) {
          tempAxios.defaults.baseURL = baseURL
        }
      }

      switch (method) {
        case 'GET':
          axiosResponse = await tempAxios.get(apiPath, {
            params: queryParams,
          })
          break
        case 'POST':
          axiosResponse = await tempAxios.post(apiPath, bodyData, {
            params: queryParams,
          })
          break
        case 'PUT':
          axiosResponse = await tempAxios.put(apiPath, bodyData, {
            params: queryParams,
          })
          break
        case 'PATCH':
          axiosResponse = await tempAxios.patch(apiPath, bodyData, {
            params: queryParams,
          })
          break
        case 'DELETE':
          axiosResponse = await tempAxios.delete(apiPath, {
            params: queryParams,
          })
          break
        default:
          throw new Error('Method không được hỗ trợ')
      }

      setResponse({
        data: axiosResponse.data,
        status: axiosResponse.status,
        statusText: axiosResponse.statusText,
        headers: axiosResponse.headers,
        config: axiosResponse.config,
      })
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi gọi API')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setApiPath('')
    setRequestBody('')
    setResponse(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test Tool</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Configuration */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Request Configuration
              </h2>

              {/* Domain Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain
                </label>
                <div className="flex space-x-2">
                  <select
                    value={selectedDomain}
                    onChange={(e) =>
                      setSelectedDomain(
                        e.target.value as keyof typeof DOMAIN_CONFIG
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Default (Axios Instance)</option>
                    <option value="local">Local (http://localhost:3000)</option>
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                    <option value="custom">Custom</option>
                  </select>
                  {selectedDomain === 'custom' && (
                    <input
                      type="text"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="https://your-api.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Current base URL:{' '}
                  <span className="font-mono">{getCurrentBaseURL()}</span>
                </div>
              </div>

              {/* Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTTP Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              {/* API Path */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Path
                </label>
                <input
                  type="text"
                  value={apiPath}
                  onChange={(e) => setApiPath(e.target.value)}
                  placeholder="Ví dụ: /api/users hoặc /auth/login"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Query Parameters */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Query Parameters
                  </label>
                  <button
                    onClick={() => addKeyValuePair('params')}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    + Add Param
                  </button>
                </div>
                <div className="space-y-2">
                  {params.map((param, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={param.key}
                        onChange={(e) =>
                          updateKeyValuePair(
                            'params',
                            index,
                            'key',
                            e.target.value
                          )
                        }
                        placeholder="Key"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) =>
                          updateKeyValuePair(
                            'params',
                            index,
                            'value',
                            e.target.value
                          )
                        }
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={() => removeKeyValuePair('params', index)}
                        disabled={params.length === 1}
                        className="px-2 py-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Body (for POST, PUT, PATCH) */}
              {['POST', 'PUT', 'PATCH'].includes(method) && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Request Body
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!useJsonBody}
                          onChange={() => setUseJsonBody(false)}
                          className="mr-2"
                        />
                        <span className="text-sm">Key-Value</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={useJsonBody}
                          onChange={() => setUseJsonBody(true)}
                          className="mr-2"
                        />
                        <span className="text-sm">JSON</span>
                      </label>
                    </div>
                  </div>

                  {useJsonBody ? (
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder='{"key": "value"}'
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    />
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-end">
                        <button
                          onClick={() => addKeyValuePair('body')}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          + Add Field
                        </button>
                      </div>
                      {bodyFields.map((field, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) =>
                              updateKeyValuePair(
                                'body',
                                index,
                                'key',
                                e.target.value
                              )
                            }
                            placeholder="Key"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateKeyValuePair(
                                'body',
                                index,
                                'value',
                                e.target.value
                              )
                            }
                            placeholder="Value"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <button
                            onClick={() => removeKeyValuePair('body', index)}
                            disabled={bodyFields.length === 1}
                            className="px-2 py-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleSendRequest}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear
                </button>
                <button
                  onClick={handleSaveResponse}
                  disabled={!response}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Response
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>
            </div>

            {/* Response Display */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Response</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              )}

              {response && (
                <div className="space-y-4">
                  {/* Status */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <h3 className="font-medium text-gray-800">Status</h3>
                    <p className="text-sm text-gray-600">
                      {response.status} {response.statusText}
                    </p>
                  </div>

                  {/* Response Data */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Response Data
                    </h3>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-auto max-h-64">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>

                  {/* Headers */}
                  <div className="bg-gray-50 rounded-md p-3">
                    <h3 className="font-medium text-gray-800 mb-2">Headers</h3>
                    <pre className="bg-gray-900 text-blue-400 p-3 rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(response.headers, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!response && !error && !loading && (
                <div className="bg-gray-50 rounded-md p-8 text-center">
                  <p className="text-gray-500">
                    Chưa có response. Hãy gửi một request để xem kết quả.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Test Examples */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Test Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setMethod('GET')
                setApiPath('/api/health')
                setRequestBody('')
              }}
              className="p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="font-medium text-blue-600">GET</div>
              <div className="text-sm text-gray-600">/api/health</div>
            </button>

            <button
              onClick={() => {
                setMethod('GET')
                setApiPath('/api/users')
                setRequestBody('')
              }}
              className="p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="font-medium text-blue-600">GET</div>
              <div className="text-sm text-gray-600">/api/users</div>
            </button>

            <button
              onClick={() => {
                setMethod('POST')
                setApiPath('/api/auth/login')
                setRequestBody(
                  '{"email": "test@example.com", "password": "password"}'
                )
              }}
              className="p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="font-medium text-green-600">POST</div>
              <div className="text-sm text-gray-600">/api/auth/login</div>
            </button>
          </div>
        </div>

        {/* API History */}
        {showHistory && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                API History ({savedCalls.length})
              </h2>
              {savedCalls.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Clear All History
                </button>
              )}
            </div>

            {savedCalls.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Chưa có lịch sử API nào được lưu.</p>
                <p className="text-sm mt-1">
                  Hãy gửi request và nhấn "Save Response" để lưu lịch sử.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedCalls.map((call) => (
                  <div
                    key={call.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedHistory?.id === call.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleLoadHistory(call)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              call.method === 'GET'
                                ? 'bg-blue-100 text-blue-800'
                                : call.method === 'POST'
                                ? 'bg-green-100 text-green-800'
                                : call.method === 'PUT'
                                ? 'bg-yellow-100 text-yellow-800'
                                : call.method === 'PATCH'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {call.method}
                          </span>
                          <span className="font-mono text-sm text-gray-700">
                            {call.path}
                          </span>
                          <span className="text-xs text-gray-500">
                            {call.response.status} {call.response.statusText}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          <div>{call.timestamp}</div>
                          <div className="font-mono">Domain: {call.domain}</div>
                        </div>
                        {call.params && Object.keys(call.params).length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-600 font-medium">
                              Params:
                            </span>
                            <div className="text-xs text-gray-600 mt-1">
                              {Object.entries(call.params).map(
                                ([key, value]) => (
                                  <span key={key} className="inline-block mr-2">
                                    <span className="font-mono">{key}</span>:{' '}
                                    <span className="text-blue-600">
                                      {value}
                                    </span>
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                        {call.requestBody && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-600 font-medium">
                              Request Body:
                            </span>
                            <pre className="text-xs text-gray-600 mt-1 bg-gray-100 p-2 rounded overflow-x-auto">
                              {call.requestBody}
                            </pre>
                          </div>
                        )}
                        <div className="mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 font-medium">
                              Response Data:
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowResponseDetail(
                                  showResponseDetail === call.id
                                    ? null
                                    : call.id
                                )
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 underline"
                            >
                              {showResponseDetail === call.id ? 'Hide' : 'Show'}{' '}
                              Headers
                            </button>
                          </div>
                          <div className="mt-2 space-y-2">
                            <div>
                              <span className="text-xs text-gray-600 font-medium">
                                Status:
                              </span>
                              <span
                                className={`ml-2 px-2 py-1 text-xs rounded ${
                                  call.response.status >= 200 &&
                                  call.response.status < 300
                                    ? 'bg-green-100 text-green-800'
                                    : call.response.status >= 400
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {call.response.status}{' '}
                                {call.response.statusText}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-600 font-medium">
                                Data:
                              </span>
                              <pre className="text-xs text-gray-600 mt-1 bg-gray-100 p-2 rounded overflow-x-auto max-h-32">
                                {JSON.stringify(call.response.data, null, 2)}
                              </pre>
                            </div>
                            {showResponseDetail === call.id &&
                              call.response.headers && (
                                <div>
                                  <span className="text-xs text-gray-600 font-medium">
                                    Headers:
                                  </span>
                                  <pre className="text-xs text-gray-600 mt-1 bg-gray-100 p-2 rounded overflow-x-auto max-h-20">
                                    {JSON.stringify(
                                      call.response.headers,
                                      null,
                                      2
                                    )}
                                  </pre>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteHistory(call.id)
                        }}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded"
                        title="Delete this history item"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
