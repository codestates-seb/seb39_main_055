package be.heart.controller;

import be.heart.dto.HeartPatchDto;
import be.heart.dto.HeartPostDto;
import be.heart.entity.Heart;
import be.heart.mapper.HeartMapper;
import be.heart.service.HeartService;
import be.response.MultiResponseDto;
import be.response.SingleResponseDto;
import be.review.mapper.ReviewMapper;
import be.review.service.ReviewService;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class HeartController {
    private final HeartService heartService;
    private final HeartMapper mapper;
    private final UserService userService;
    private final StoreService storeService;
    private final StoreMapper storeMapper;
    private final UserMapper userMapper;
    private final StoreImageService storeImageService;
    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;

    /**
     * 가게 하트등록 API
     * **/
    @PostMapping("user/heart/register")
    public ResponseEntity postHeart(@Valid @RequestBody HeartPostDto heartPostDto){
        Heart heart = mapper.heartPostDtoToHeart(storeService,userService,heartPostDto);
        Heart createdHeart = heartService.createHeart(heart);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.heartToHeartResponseDto(reviewService,heartService,reviewMapper,storeMapper,userMapper,storeImageService,createdHeart)),
                HttpStatus.CREATED
        );
    }

    /**
     * 가게 하트등록 취소 API
     * **/
    @PatchMapping("user/heart/cancel")
    public ResponseEntity patchHeart(@Valid @RequestBody HeartPatchDto heartPatchDto){

        Heart heart = mapper.heartPatchDtoToHeart(storeService,userService,heartPatchDto);

        Heart updatedHeart = heartService.updateHeart(heart);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.heartToHeartResponseDto(reviewService,heartService,reviewMapper,storeMapper,userMapper,storeImageService,updatedHeart)),
                HttpStatus.OK
        );

    }

    /**
     * 하트 누른 가게 목록리스트 가져오기API
     * **/
    @GetMapping("user/heart/list")
    public ResponseEntity getHearts(@Positive @RequestParam("page") int page,
                                    @Positive @RequestParam("size") int size){

        Page<Heart> pageHearts = heartService.findHearts(userService,page-1,size);

        List<Heart> hearts = pageHearts.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.heartsToHeartResponseDtos(reviewService,heartService,reviewMapper,storeMapper,userMapper,storeImageService,hearts),
                pageHearts),HttpStatus.OK);
    }





}
