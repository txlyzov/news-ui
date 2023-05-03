import "./MainPage.scss"
import React, { useEffect } from 'react';
import { Button, CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import PageWrapper from '../../components/Wrappers/PageWrapper/PageWrapper';
import ContentWrapper from '../../components/Wrappers/ContentWrapper/ContentWrapper';
import { PATH_VARIBLES } from "../../../utils/Constants";
import NewsStore from "../../../mobx-store/NewsStore";
import { getItemsByIdArray, getLatestItems } from "../../../services/NewsService";
import { timeConvertor } from "../../../utils/Funcs";

const MainPage = observer(() => {
    const updateData = async (force = false) => {
        const prevData = NewsStore.newsList;
        NewsStore.setNewsList(undefined);
        const newsIdArray = await getLatestItems();

        if (!prevData || prevData[0].id !== newsIdArray[0] || force) {
            const newsObjArray = await getItemsByIdArray(newsIdArray.slice(0, 100));
            NewsStore.setNewsList(newsObjArray.sort((first, second) => second.time - first.time))
            NewsStore.setLastUpdateTime(timeConvertor(Date.now()))
        } else {
            NewsStore.setNewsList(prevData)
        }
    }

    useEffect(() => {
        updateData();
    }, []);

    return (
        <PageWrapper className='main-page__page-wraper'>
            <ContentWrapper className='main-page__content-wraper'>
                <div className='main-page__left-side dashboard'>
                    <h2 className='dashboard__title'>UI for news with MUI</h2>
                    <h3 className='dashboard__last-update'>
                        Last update - {NewsStore.lastUpdateTime ?
                            NewsStore.lastUpdateTime
                            :
                            'Updating'
                        }
                    </h3>
                    <Button
                        className='dashboard__update-button'
                        variant="contained"
                        disabled={NewsStore.newsList === undefined}
                        onClick={() => { updateData() }}
                    >
                        {NewsStore.newsList !== undefined ? '' :
                            <CircularProgress
                                className="dashboard__loader"
                                size={20}
                                color="secondary"
                            />}

                        {NewsStore.newsList !== undefined ?
                            `Update data (if new news avalible)`
                            :
                            'Loading..'}
                    </Button>
                    <Button
                        className='dashboard__update-button'
                        variant="contained"
                        disabled={NewsStore.newsList === undefined}
                        onClick={() => { updateData(true) }}
                    >
                        {NewsStore.newsList !== undefined ? '' :
                            <CircularProgress
                                className="dashboard__loader"
                                size={20}
                                color="secondary"
                            />}

                        {NewsStore.newsList !== undefined ?
                            `Update data (anyway)`
                            :
                            `Loading..`}
                    </Button>
                </div>

                <div className='main-page__right-side news-list'>
                    <h2 className="news-list__title">Latest 100 news here:</h2>
                    {
                        NewsStore.newsList !== undefined || false ?
                            <List className="news-list__list">
                                {NewsStore.newsList.map((item) =>
                                    <ListItemButton
                                        key={item.id}
                                        className={`news-list__row item-${item.id}`}
                                        divider
                                    >
                                        <ListItem className="news-list__item" alignItems="flex-start">
                                            <ListItemText
                                                className="news-list__text"
                                                primary={
                                                    <div className="news-list__title-wrapper">
                                                        <h4 className="news-list__item-title">
                                                            <Link
                                                                className="news-list__link-to-item"
                                                                to={PATH_VARIBLES.NEWS(item.id)}
                                                            >
                                                                {`${item.title} (${timeConvertor(item.time, 1000)})`}
                                                            </Link>
                                                        </h4>
                                                    </div>
                                                }
                                                secondary={
                                                    <>
                                                        Creator - <Link
                                                            className="news-list__creator-link"
                                                            target="blank"
                                                            to={`https://news.ycombinator.com/user?id=${item.by}`}
                                                        >
                                                            {item.by}
                                                        </Link>
                                                        , Rating - {item.score}
                                                    </>}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                )}
                            </List>
                            :
                            <CircularProgress color="secondary" />
                    }
                </div>
            </ContentWrapper>
        </PageWrapper>
    )
})

export default MainPage;
