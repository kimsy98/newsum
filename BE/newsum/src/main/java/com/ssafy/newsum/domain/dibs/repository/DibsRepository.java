package com.ssafy.newsum.domain.dibs.repository;

import com.ssafy.newsum.domain.dibs.entity.Dibs;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DibsRepository extends JpaRepository<Dibs, Integer> {

    //좋아요 유무
    @Query("select case when count(a) > 0 then true else false end from Dibs a where a.type = 'n' " +
            "and a.user.userId = :userId " +
            "and a.contentId = :newsId ")
    Boolean isLiked(@Param("userId") Integer userId, @Param("newsId") Integer newsId);


    // 좋아요
    @Query("select d from Dibs d where d.user.userId =:userId and d.contentId =:newsId")
    Optional<Dibs> selectDibs(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

}
