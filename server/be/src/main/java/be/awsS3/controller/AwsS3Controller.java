package be.awsS3.controller;


import be.awsS3.service.AwsS3Service;
import be.response.MultiResponseDto;
import be.response.SingleResponseDto;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RequestMapping("/v1")
@RequiredArgsConstructor
@RestController
public class AwsS3Controller {

    private final AwsS3Service awsS3Service;

    private final UserService userService;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @PostMapping("user/upload")
    public ResponseEntity uploadFile(@RequestParam("files") List<MultipartFile> multipartFiles) throws IOException {

        long userId = userService.getLoginUser().getUserId();
        System.out.printf("upload userId: {}\n", userId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(awsS3Service.uploadFile(userId,multipartFiles)), HttpStatus.CREATED
        );
    }
}
