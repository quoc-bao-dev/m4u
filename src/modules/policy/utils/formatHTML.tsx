
export const formatHtml = (htmlContent: string) => {
    if (!htmlContent) return "";

    const customStyle = `
    <style>
      .m4u-html-container {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: #333;
      }
      /* Khoảng cách cho các thẻ heading */
      .m4u-html-container h2 {
        margin: 24px 0 8px 0;
        font-size: 1.2rem;
        color: #000;
      }
      .m4u-html-container h3 {
        margin: 8px 0 8px 0;
        color: #222;
      }
      /* Reset list mặc định */
      .m4u-html-container ul {
        list-style: none;
        padding-left: 0;
        margin: 8px 0 16px 0;
      }
      /* Style cho thẻ li với bullet tròn xanh 4x4px */
      .m4u-html-container li {
        position: relative;
        padding-left: 18px; /* Khoảng cách từ text đến bullet */
        margin-bottom: 3px;
        display: block;
      }
      .m4u-html-container li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.65em; /* Căn giữa theo dòng chữ */
        width: 4px;
        height: 4px;
        background-color: #007AFF; /* Màu xanh của App */
        border-radius: 50%;
      }
      /* Khoảng cách cho đoạn văn p */
      .m4u-html-container p {
        margin-bottom: 12px;
      }
    </style>
  `;

    // Bọc nội dung vào div container để apply style
    return `${customStyle}<div class="m4u-html-container">${htmlContent}</div>`;
};