export type PolicyItem = {
    title: string
    name: string
    content: string
    id: number
}

export type PolicyData = {
    policy: PolicyItem[]
}

export type GetGeneralPolicyResponse = {
    result: boolean
    data: PolicyData
}

