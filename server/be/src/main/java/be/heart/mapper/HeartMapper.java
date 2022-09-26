package be.heart.mapper;

import be.heart.dto.HeartPatchDto;
import be.heart.dto.HeartPostDto;
import be.heart.dto.HeartResponseDto;
import be.heart.entity.Heart;
import be.heart.service.HeartService;
import be.review.mapper.ReviewMapper;
import be.review.service.ReviewService;
import be.store.dto.StoreResponseDto;
import be.store.entity.Store;
import be.store.mapper.StoreMapper;
import be.store.service.StoreImageService;
import be.store.service.StoreService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface HeartMapper {

    default Heart heartPostDtoToHeart(StoreService storeService, UserService userService, HeartPostDto heartPostDto){

        User user = userService.getLoginUser(); // request http 헤더의 토큰에 해당하는 유저 불러옴
        Store store = storeService.findVerifiedStore(heartPostDto.getStoreId()); //유저가 하트누른 가게 불러오기
        Heart heart = new Heart();

        heart.setStore(store);
        heart.setUser(user);

        return heart;

    }


    default Heart heartPatchDtoToHeart(StoreService storeService,UserService userService,HeartPatchDto heartPatchDto){

        User user = userService.getLoginUser(); // request http 헤더의 토큰에 해당하는 유저 불러옴
        Store store = storeService.findVerifiedStore(heartPatchDto.getStoreId()); //유저가 하트누른 가게 불러오기
        Heart heart = new Heart();

        heart.setHeartStatus(heartPatchDto.getHeartStatus());
        heart.setStore(store);
        heart.setUser(user);


        return heart;
    }

    default HeartResponseDto heartToHeartResponseDto(ReviewService reviewService,HeartService heartService, ReviewMapper reviewMapper, StoreMapper storeMapper, UserMapper userMapper, StoreImageService storeImageService, Heart heart){
        HeartResponseDto heartResponseDto = new HeartResponseDto();
        heartResponseDto.setHeartId(heart.getHeartId());
        heartResponseDto.setHeartStatus(heart.getHeartStatus());
        heartResponseDto.setUpdatedAt(heart.getUpdatedAt());
        heartResponseDto.setCreatedAt(heart.getCreatedAt());

        StoreResponseDto storeResponseDto = storeMapper.storeToStoreResponseDto(reviewService,heartService,reviewMapper,userMapper,storeImageService,heart.getStore());
        heartResponseDto.setStore(storeResponseDto);

        UserResponseDto userResponseDto = userMapper.userToUserResponseDto(heart.getUser());
        heartResponseDto.setUser(userResponseDto);



        return heartResponseDto;
    }

    default List<HeartResponseDto> heartsToHeartResponseDtos(ReviewService reviewService,HeartService heartService,ReviewMapper reviewMapper,StoreMapper storeMapper, UserMapper userMapper, StoreImageService storeImageService,List<Heart> hearts){
        return hearts.stream().map(heart -> heartToHeartResponseDto(reviewService,heartService,reviewMapper,storeMapper,userMapper,storeImageService,heart))
                .collect(Collectors.toList());
    };
}
