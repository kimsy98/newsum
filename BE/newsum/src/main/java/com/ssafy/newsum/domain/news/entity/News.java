package com.ssafy.newsum.domain.news.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "news")
@Getter
@ToString
public class News {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer newsId;

	@Column
	private String head;

	@Column
	private String main;

	@Column(name = "three_line")
	private String threeLine;

	@Column
	private String url;

	@Column(name = "posted_date")
	private String postedDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "media_id", referencedColumnName = "id")
	private Media mediaId;

	@Column
	private String image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cg_id", referencedColumnName = "id")
	private Category cgId;

	@Column(name = "total_like")
	private Integer totalLike;

	@Column(name = "total_scrap")
	private Integer totalScrap;

	@Column(name = "view_cnt")
	private Integer viewCnt;

	@Column(name = "nouns")
	private String nouns;

}
