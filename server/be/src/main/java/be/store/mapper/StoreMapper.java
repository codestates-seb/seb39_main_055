package be.store.mapper;

import be.store.dto.StoreImageDto;
import be.store.dto.StoreImageResponseDto;
import be.store.dto.StorePostDto;
import be.store.dto.StoreResponseDto;
import be.store.entity.Store;
import be.store.entity.StoreImage;
import be.store.service.StoreImageService;
import be.user.dto.UserResponseDto;
import be.user.entity.User;
import be.user.mapper.UserMapper;
import be.user.service.UserService;
import org.mapstruct.Mapper;

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

        if(storePostDto.getHomepage()==null){
            System.out.printf("홈페이지 아무것도 안들어옴");
        }else{
            store.setHomepage(storePostDto.getHomepage());
        }


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
                    return  storeImageResponseDto;
                }).collect(Collectors.toList());
    }

    default StoreResponseDto storeToStoreResponse(UserMapper userMapper, StoreImageService storeImageService,Store store){
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


        return storeResponseDto;
    }
}
