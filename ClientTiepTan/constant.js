export const HTTP_CODE = Object.freeze({
    200: { code: 200, message: "Success" },
    400: { code: 400, message: "Bad Request" },
    401: { code: 401, message: "Unauthorized" },
    403: { code: 403, message: "Forbidden" },
    404: { code: 404, message: "Not Found" },
    500: { code: 500, message: "Internal Server Error" },
    502: { code: 502, message: "Bad Gateway" },
    503: { code: 503, message: "Service Unavailable" },
  });
  export const MESSAGE = Object.freeze({
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGIN_FAIL: "Đăng nhập thất bại",
    MISSING_PARAMS: "Thiếu tham số",
    USER_NOT_FOUND: "Người dùng không tồn tại",
    INVALID_PASSWORD: "Mật khẩu không hợp lệ",
  });
  