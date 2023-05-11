import "./NewsPage.scss";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { observer } from "mobx-react-lite";
import PageWrapper from '../../components/Wrappers/PageWrapper/PageWrapper';
import ContentWrapper from '../../components/Wrappers/ContentWrapper/ContentWrapper';
import { getItemById, getItemsByIdArray } from '../../../services/NewsService';
import { timeConvertor } from "../../../utils/Funcs";
import Header from "../../components/Header/Header";
import CurrentItemStore from "../../../mobx-store/CurrentItemStore";
import Commets from "../../components/Comments/Comments";
import { PATH_VARIBLES } from "../../../utils/Constants";

const NewsPage = observer(() => {
    const params = useParams();
    const [commentsCounter, setCommentsCounter] = useState(0);
    const [showComments, setShowComments] = useState(false);

    const countComments = (element = [], initCounter = 0) => {
        let counter = initCounter;

        if (!element.kids) return counter;
        element.kids.forEach(kidElement => {
            counter = countComments(kidElement, counter + 1)
        });

        return counter;
    }

    const loadCommentsTree = async (parentObj = []) => {
        if (!parentObj.kids) {
            return { ...parentObj }
        }

        const kidsObjArray = await getItemsByIdArray(parentObj.kids);
        const modifiedkidsObjArray = [];

        const promise = kidsObjArray.map((kidObj) => new Promise((resolve, reject) => {
            try {
                resolve(loadCommentsTree(kidObj));
            } catch (error) {
                reject(error);
            }
        }).then((newParentObj) => {
            modifiedkidsObjArray.push(newParentObj)
        }));

        await Promise.all(promise);

        return { ...parentObj, kids: modifiedkidsObjArray };
    }

    const loadElement = async () => {
        CurrentItemStore.setCurrentItem(undefined);
        const item = await getItemById(params[PATH_VARIBLES.NODES.NEWS_ID]);
        if (!item) {
            setCommentsCounter(countComments(0));
            return
        }

        const itemWithCommentsTree = await loadCommentsTree(item);
        if (!itemWithCommentsTree) {
            setCommentsCounter(countComments(0));
            return
        }

        CurrentItemStore.setCurrentItem(itemWithCommentsTree);
        setCommentsCounter(countComments(itemWithCommentsTree));
    }

    useEffect(() => {
        loadElement();
    }, [params[PATH_VARIBLES.NODES.NEWS_ID]]);

    return (
        <PageWrapper className='news-page__page-wraper'>
            <Header />
            <ContentWrapper className='news-page__content-wraper'>
                {CurrentItemStore.currentItem ? <>
                    <div className="news-page__left-side general-data">
                        <h2 className="general-data__title">
                            {`Title: ${CurrentItemStore.currentItem.title} (${timeConvertor(CurrentItemStore.currentItem.time, 1000)})`}
                        </h2>
                        <h3 className="general-data__creator">Directed by: <Link
                            className="general-data__creator-link"
                            target="blank"
                            to={`https://news.ycombinator.com/user?id=${CurrentItemStore.currentItem.by}`}
                        >
                            {CurrentItemStore.currentItem.by}
                        </Link>
                        </h3>
                        {CurrentItemStore.currentItem.url ?
                            <h3 className="general-data__original">
                                <Link
                                    className="general-data__original-link"
                                    target="blank"
                                    to={CurrentItemStore.currentItem.url}
                                >

                                    Link to original article
                                </Link></h3>
                            : ''
                        }

                        <h3 className="general-data__comments-number">Comments: {commentsCounter}</h3>
                        <Button
                            className="general-data__show-comments-button"
                            variant="contained"
                            onClick={() => {
                                setShowComments(!showComments);
                            }}
                        >
                            Show comments
                        </Button>
                        <Button
                            className="general-data__update-button"
                            variant="contained"
                            onClick={async () => {
                                loadElement();
                            }}
                        >
                            Update info
                        </Button>
                    </div>

                    {showComments ? <div className="news-page__right-side comments">
                        <h3 className="comments__title">Comments:</h3>
                        {commentsCounter > 0 ? <Commets className="comments__tree" commentItem={CurrentItemStore.currentItem} /> : <p className="comments__note">No comments avaliable.</p>}
                    </div> : ''}


                </> : <CircularProgress
                    className="dashboard__loader"
                    color="secondary"
                />}

            </ContentWrapper>
        </PageWrapper>
    );
})

export default NewsPage;
