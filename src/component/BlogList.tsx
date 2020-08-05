import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasFaStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

import "../style/blog_list.css";
import { addBookmark, deleteBookmark } from "../redux/actions";

interface BlogSource {
  title: string;
  contents: string;
  url: string;
  blogname: string;
  thumbnail: string;
  datetime: string;
  isBookmark: boolean;
}

interface Props {
  addBookmark: (blogUrl: string) => void;
  deleteBookmark: (index: number, blogUrl: string) => void;
  useSearch?: boolean;
  bookmark: string[];
  showDocuments: BlogSource[];
  showBookmark: BlogSource[];
}

const BlogList = (props: Props) => {
  const documents = props.useSearch ? props.showDocuments : props.showBookmark;
  const setBookmark = (isBookmark: boolean, blogUrl: string) => {
    if (isBookmark) {
      const index = props.bookmark.findIndex((url: string) => url === blogUrl);
      if (index !== -1) props.deleteBookmark(index, blogUrl);
    } else {
      props.addBookmark(blogUrl);
    }
  };

  return (
    <div className="grid-container">
      {documents.map((blog: BlogSource, index: number) => {
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
            <span
              className="bookmark"
              onClick={() => setBookmark(blog.isBookmark, blog.url)}
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

const mapStateToProps = (state: {
  searchInfo: SearchInfo;
  bookmark: [];
  documents: NewDocuments;
}) => {
  const {
    documents,
    bookmark,
    searchInfo: { docUrl = [] },
  } = state;

  return {
    showDocuments: docUrl.map((url: string) => documents[url]),
    showBookmark: bookmark.map((url: string) => documents[url]),
    bookmark,
  };
};

const mapDispatchToProps = { addBookmark, deleteBookmark };

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
