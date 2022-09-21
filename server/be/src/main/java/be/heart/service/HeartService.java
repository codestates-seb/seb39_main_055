package be.heart.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.heart.entity.Heart;
import be.heart.repository.HeartRepository;
import be.store.entity.Store;
import be.user.entity.User;
import be.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class HeartService {

    HeartRepository heartRepository;

    @Transactional
    public Heart createHeart(Heart heart){

        verifyExistHeart(heart.getUser(),heart.getStore());//이미 등록된 하트인지 확인

        return heartRepository.save(heart);
    }

    @Transactional
    public Heart updateHeart(Heart heart){

        Heart findHeart = findExistHeart(heart.getUser(),heart.getStore());//등록된 하트면 반환->등록된 하트가 아니면 에러!

        Optional.ofNullable(heart.getHeartStatus())//하트 삭제
                .ifPresent(heartStatus -> findHeart.setHeartStatus(heartStatus));

        return findHeart;
    }

    public Page<Heart> findHearts(UserService userService,int page, int size){//해당 유저가 누른 하트에 pagenation과 최신순 sort 구현
        User user = userService.getLoginUser(); //해당토큰의 유저 가져오기
        Page<Heart> hearts = heartRepository.findByUserAndHeartStatus(//삭제된 하트 빼고 해당 유저의 전체 하트 가져옴
                PageRequest.of(page,size, Sort.by("createdAt").descending()),
                user,
                Heart.HeartStatus.HEART_EXIST);
        verifiedNoHeart(hearts);//findAllHeart안의 반환된 데이터가 없으면 예외발생

        return hearts;
    }

    private void verifiedNoHeart(Page<Heart> hearts){
        if(hearts.getTotalElements()==0){
            throw new BusinessLogicException(ExceptionCode.HEART_NOT_FOUND);
        }
    }

    private Heart findExistHeart(User user, Store store){//등록된 하트면 반환->등록된 하트가 아니면 에러!

        Optional<Heart> heart = heartRepository.findByUserAndStoreAndHeartStatus(user,store, Heart.HeartStatus.HEART_EXIST);
        if(!heart.isPresent()) //등록된 하트가 아니면 에러!
            throw new BusinessLogicException(ExceptionCode.HEART_NOT_FOUND);

        return heart.get();
    }

    private void verifyExistHeart(User user, Store store){//이미 등록된 하트인지 확인

        Optional<Heart> heart = heartRepository.findByUserAndStoreAndHeartStatus(user,store, Heart.HeartStatus.HEART_EXIST);
        if(heart.isPresent()) //이미 등록된 하트면 에러!
            throw new BusinessLogicException(ExceptionCode.HEART_EXIST);

    }
}
