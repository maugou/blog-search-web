import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

import "../style/blog_list.css";
import { setBookmark } from "../redux/actions";

interface SearchedBlog {
  meta?: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents?: {
    title: string;
    contents: string;
    url: string;
    blogname: string;
    thumbnail: string;
    datetime: string;
  }[];
}

interface Props extends SearchedBlog {
  setBookmark: (blog: {}[]) => void;
  useSearch?: boolean;
}

const BlogList = (props: Props) => {
  const documents = props.useSearch ? props.documents : [];

  return (
    <div className="grid-container">
      {documents?.map((blog: any, index: number) => {
        const title = { __html: blog.title };
        const contents = { __html: blog.contents };
        return (
          <div className="blog-box" key={index}>
            <a href={blog.url}>
              <div className="title" dangerouslySetInnerHTML={title} />
              <div className="row">
                <div className="contents" dangerouslySetInnerHTML={contents} />
                <img src={blog.thumbnail} />
              </div>
            </a>
            <span className="bookmark" onClick={() => props.setBookmark(blog)}>
              <FontAwesomeIcon icon={blog.isBookmark ? fasFaStar : farFaStar} />{" "}
              즐겨찾기
            </span>
            <span className="blog-info">
              {blog.blogname} • {moment(blog.datetime).format("YYYY-MM-DD")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: { searchedBlog: SearchedBlog }) => {
  const {
    searchedBlog: { documents },
  } = state;
  return { documents };
};

const mapDispatchToProps = { setBookmark };

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
