package be.exception;

import lombok.Getter;

public enum ExceptionCode {

    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),
    THREAD_NOT_FOUND(404, "Thread not found"),
    THREAD_EXISTS(409, "Thread exists"),
    REPLY_NOT_FOUND(404, "Reply not found"),
    REPLY_EXISTS(409, "Reply exists"),
    STORE_NOT_FOUND(404, "Store not found"),
    STORE_EXISTS(409, "Store exists"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    REVIEW_EXISTS(409, "Review exists"),
    ACCESS_DENIED_USER(403,"Access Denied User"),
//    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    PHOTO_NOT_FOUND(404, "photo not found"),
    FILE_UPLOAD_FAILED(417, "file upload fail"),
    FILE_SIZE_EXCEED(431,"file size exceed"),
    HEART_EXIST(409,"Heart exists"),
    HEART_NOT_FOUND(404,"Heart not found"),

    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");  // TO 추가된 부분

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
