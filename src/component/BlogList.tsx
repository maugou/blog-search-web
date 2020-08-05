import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

import "../style/blog_list.css";

interface Props {
  toggleBookmark: (blogUrl: string) => void;
  documents: BlogSource[];
}

export const BlogList = (props: Props) => {
  return (
    <div className="grid-container">
      {props.documents.map((blog: BlogSource, index: number) => {
        const title = { __html: blog.title };
        const contents = { __html: blog.contents };
        return (
          <div className="blog-box" key={index}>
            <a href={blog.url}>
              <div className="title" dangerouslySetInnerHTML={title} />
              <div className="row">
                <div className="contents" dangerouslySetInnerHTML={contents} />
                <img src={blog.thumbnail} alt={blog.thumbnail} />
              </div>
            </a>
            <span
              className="bookmark"
              onClick={() => props.toggleBookmark(blog.url)}
            >
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
