import "./Comments.scss";
import HTMLReactParser from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Link } from "react-router-dom";

function Commets({ commentItem, className = '', level = 0 }) {
    return (
        <div
            className={`${className ? `${className} ` : ''}comment`}
            style={{ marginLeft: `${20 * level}px` }}
        >
            {commentItem.type === "comment" && commentItem.text ?
                <>
                    <h3 className='comment__author'>
                        <Link
                            className="comment__author-link"
                            target="blank"
                            to={`https://news.ycombinator.com/user?id=${commentItem.by}`}
                        >
                            {commentItem.by}
                        </Link>
                    </h3>
                    {HTMLReactParser(commentItem.text)}
                </>
                : ''
            }

            {commentItem.kids ? commentItem.kids.map((kidElement) =>
                <Commets key={commentItem.id + uuidv4()} commentItem={kidElement} level={level + 1} />
            ) : ''}
        </div>
    );
}

export default Commets;
