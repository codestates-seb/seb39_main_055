package be.store.controller;

import be.response.SingleResponseDto;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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

    /**
     * 업주 매장 등록 API
     * **/
    @PostMapping("/owner/store/register")
    public ResponseEntity postStore(@Valid @RequestBody StorePostDto storePostDto){
        Store store = mapper.storePostDtoToStore(userService,storePostDto);
        Store createdStore = storeService.createStore(store);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.storeToStoreResponse(userMapper,storeImageService,createdStore)), HttpStatus.CREATED
        );
    }
}
