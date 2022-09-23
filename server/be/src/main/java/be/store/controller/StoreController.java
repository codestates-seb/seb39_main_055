package be.store.controller;

import be.response.SingleResponseDto;
import be.review.mapper.ReviewMapper;
import be.store.dto.StorePatchDto;
import be.store.dto.StorePostDto;
import be.store.entity.Store;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/v1")
@Validated
@Slf4j
@AllArgsConstructor
public class StoreController {
    private final StoreService storeService;
    private final StoreMapper mapper;
    private final UserService userService;
    private final UserMapper userMapper;
    private final StoreImageService storeImageService;
    private final ReviewMapper reviewMapper;

    /**
     * 업주 매장 등록 API
     * **/
    @PostMapping("/owner/store/register")
    public ResponseEntity postStore(@Valid @RequestBody StorePostDto storePostDto){
        Store store = mapper.storePostDtoToStore(userService,storePostDto);
        Store createdStore = storeService.createStore(store);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.storeToStoreResponse(reviewMapper,userMapper,storeImageService,createdStore)), HttpStatus.CREATED
        );
    }

    /**
     * 선택한 스토어 수정 API
     * **/
    @PatchMapping("/owner/store/update/{store-id}")
    public ResponseEntity patchStore(@PathVariable("store-id") @Positive @NotNull Long storeId,
                                     @Valid @RequestBody StorePatchDto storePatchDto){
        Store store = mapper.storePatchDtoToStore(storeService,userService,storeId,storePatchDto);
        Store updatedStore = storeService.updateStore(store);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.storeToStoreResponse(reviewMapper,userMapper,storeImageService,updatedStore)),
                HttpStatus.OK
        );

    }



}
