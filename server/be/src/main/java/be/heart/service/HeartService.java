package be.heart.service;

import be.exception.BusinessLogicException;
import be.exception.ExceptionCode;
import be.heart.entity.Heart;
import be.heart.repository.HeartRepository;
import be.store.entity.Store;
import be.user.entity.User;
import lombok.AllArgsConstructor;
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

    private void verifyExistHeart(User user, Store store){//이미 등록된 하트인지 확인

        Optional<Heart> heart = heartRepository.findByUserAndStore(user,store);
        if(heart.isPresent())
            throw new BusinessLogicException(ExceptionCode.HEART_EXIST);

    }
}
