package be.store.mapper;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.heart.dto.HeartResponseDto;
import be.heart.entity.Heart;
import be.heart.mapper.HeartMapper;
import be.heart.service.HeartService;
import be.review.dto.ReviewResponseDto;
import be.review.mapper.ReviewMapper;
import be.store.dto.*;
import be.store.entity.Store;
import be.store.entity.StoreImage;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StoreMapper {


    default  Store storePostDtoToStore(UserService userService,StorePostDto storePostDto){
        Store store = new Store();
        store.setCategory(storePostDto.getCategory());
        store.setLongitude(storePostDto.getLongitude());
        store.setLatitude(storePostDto.getLatitude());
        store.setName(storePostDto.getStoreName());
        store.setAddressName(storePostDto.getAddressName());
        store.setBody(storePostDto.getBody());
        store.setPhone(storePostDto.getPhone());

//        if(storePostDto.getHomepage()==null){
//            System.out.printf("홈페이지 아무것도 안들어옴");
//        }else{
//            store.setHomepage(storePostDto.getHomepage());
//        }
        store.setHomepage(storePostDto.getHomepage());


        if(storePostDto.getStoreImages()==null){
            System.out.printf("이미지 아무것도 안들어옴");
        }else{//이미지 한개 이상 들어왔을 때 -> 해당 이미지들을 Store객체에 넣어준다.
            List<StoreImage> storeImages = storeImageDtosToStoreImages(storePostDto.getStoreImages(),store);
            store.setStoreImages(storeImages);
        }

        User user =userService.getLoginUser();// 현재 로그인된 유저 가져옴
        store.setUser(user);

        return store;
    }

    default  List<StoreImage> storeImageDtosToStoreImages(List<StoreImageDto> storeImageDtos,Store store){
        // changing from storeImageDtos to StoreImages
        return storeImageDtos.stream().map(storeImageDto -> {
            StoreImage storeImage = new StoreImage();
            storeImage.setStore(store);
            storeImage.setImage(storeImageDto.getStoreImage());
            return storeImage;
        }).collect(Collectors.toList());
    }

    default  List<StoreImageResponseDto> storeImagesToStoreImageResponseDtos(List<StoreImage> storeImages){

        return storeImages.stream()
                .map(storeImage -> {
                    StoreImageResponseDto storeImageResponseDto =  new StoreImageResponseDto();
                    storeImageResponseDto.setStoreImage(storeImage.getImage());
                    storeImageResponseDto.setStoreImageStatus(storeImage.getStoreImageStatus());
                    return  storeImageResponseDto;
                }).collect(Collectors.toList());
    }

    default StoreResponseDto storeToStoreResponseDto(HeartService heartService,ReviewMapper reviewMapper, UserMapper userMapper, StoreImageService storeImageService, Store store){
        StoreResponseDto storeResponseDto = new StoreResponseDto();
        storeResponseDto.setStoreId(store.getStoreId());
        storeResponseDto.setCreatedAt(store.getCreatedAt());
        storeResponseDto.setUpdatedAt(store.getUpdatedAt());
        storeResponseDto.setStoreStatus(store.getStoreStatus());
        storeResponseDto.setCategory(store.getCategory());
        storeResponseDto.setLongitude(store.getLongitude());
        storeResponseDto.setLatitude(store.getLatitude());
        storeResponseDto.setStoreName(store.getName());
        storeResponseDto.setAddressName(store.getAddressName());
        storeResponseDto.setBody(store.getBody());
        storeResponseDto.setPhone(store.getPhone());
        storeResponseDto.setHomepage(store.getHomepage());

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(store.getUser());
        storeResponseDto.setUser(userResponseDto);

        storeResponseDto.setStoreImages(storeImagesToStoreImageResponseDtos(//가게에 대한 이미지 속성 추가
                storeImageService.findVerifiedStoreImages(store)
        ));

        List<ReviewResponseDto> reviewResponseDtos = reviewMapper.reviewsToReviewResponseDtos(userMapper,store.getReviews());
        storeResponseDto.setReviews(reviewResponseDtos);


        List<Heart> hearts = heartService.findExistHeartsByStore(store);//해당 store의 하트중에 Status가 HEART_EXIST인 하트들만 반환
        List<Long> heartUserId = hearts.stream().map(heart -> heart.getUser().getUserId()).collect(Collectors.toList());
        storeResponseDto.setHeartUserId(heartUserId);


        return storeResponseDto;
    }

    default List<StoreResponseDto> storesToStoreResponseDtos(HeartService heartService,ReviewMapper reviewMapper, UserMapper userMapper, StoreImageService storeImageService,List<Store> stores){
        return stores.stream().map(store -> storeToStoreResponseDto(heartService,reviewMapper,userMapper,storeImageService,store))
                .collect(Collectors.toList());
    };

    default Store storePatchDtoToStore(StoreService storeService,UserService userService, long storeId, StorePatchDto storePatchDto){

        if(userService.getLoginUser() != storeService.findUserAtStore(storeId)){
            //접근 오너가 가지고 있는 가게가 아니므로 수정 삭제 불가
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED_USER);
        }
        Store store = new Store();
        store.setStoreId(storeId);

        // changing from StoreImageDto to StoreImage
        if(storePatchDto.getStoreImages()==null){
            System.out.printf("이미지 아무것도 안들어옴!!");
        }else{//이미지 한개 이상 들어왔을 때 -> 해당 이미지들을 Store객체에 넣어준다.
            List<StoreImage> storeImages = storeImageDtosToStoreImages(storePatchDto.getStoreImages(),store);
            store.setStoreImages(storeImages);
        }

        store.setLatitude(storePatchDto.getLatitude());
        store.setLongitude(storePatchDto.getLongitude());
        store.setCategory(storePatchDto.getCategory());
        store.setName(storePatchDto.getStoreName());
        store.setAddressName(storePatchDto.getAddressName());
        store.setBody(storePatchDto.getBody());
        store.setPhone(storePatchDto.getPhone());
        store.setHomepage(storePatchDto.getHomepage());

        //스토어 삭제
        store.setStoreStatus(storePatchDto.getStoreStatus());
        System.out.println(store.getStoreStatus());

        return store;

    }
}
