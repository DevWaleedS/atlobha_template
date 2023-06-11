// react
import React, { useState } from 'react';

// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';

// data stubs

function ProductTabReviews({ data }) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTIxZjEyMy03MTlkLTRiNjctOTdkYi03YWQ0MWI2NjQ0MjAiLCJqdGkiOiI4MWIzZjU5NTc4MjE5ZTlmMWNlZTU4MWRjOTk3YmU4NmJkYjJkMjNjM2Y4ZGYxOGYyYWQzNTAzNDIyMmYyZjE4OWFlODNjMzU2MGU5MjE2YSIsImlhdCI6MTY4NTk2MDc3My4yODg2NzgsIm5iZiI6MTY4NTk2MDc3My4yODg2ODEsImV4cCI6MTcxNzU4MzE3My4yODMxOTMsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.kg0QmEEzRyFGmjHM40ejtz3VbBMUFspTXlMSII6PXWGCIwYcqDCj3PhqQ7-UDKCxYsBOh8QwYt1be9UpCwNkZUeRimI-AQhIgcsWO8CYdwFrfoiwZ2oz25nAh8qcka-blz-Ud2jcQERBpNbz-Bu0_QK8v_3cgX7OKyiw6ZN_8H-SvEIQWDEpV647OfVomYybksB-5gLSc9hBGL6WXYlv8WftxRmY1LacwRSz7jw3ePqBMmJv70BK_MJUXTxsZ9Vgb_1ShZzjYzue1AdthfLAK5C-WA3xBWjdef0kCTGv_PxhfQBMkD9aKV5Iz13Dsl1uPzvnraczvUj6cx2FMKHKxT5HvgSNtFfNvH_RGTDsTvFAXeZ32uaOwNqydRh66RxLY9gSoncvMjGxDxRBWrL--PwJazfhmHBNoMVDE1RB9irRL4yedcz17X-WgSdv_xyANroFoEu-auTeSGG10EqicT8y-NzzogQyjt95Bz-cjHJgKSBfwU5GWkzFDhEOm3Kemit-Mr6euCkN0rcUEBxQw-EcWsEmO9rbP_wEMuWjNECYnqu4KMrMZyQ69V9eUz1mHnP0mWfGkgkvR4cCk6Poby3E12HS9mwvKep4fLrwwA1Pjo2TVpkJpopIvf8CND5n2W3NFyoYloWI4uNPlQhfjUhZK2FiR2SBq-z8eablfjw';
    const [comment, setComment] = useState({
        commentText: '',
        rateing: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentComments = data?.commentOfProducts?.slice(indexOfFirstPost, indexOfLastPost);
    const handleAddComment = () => {
        const commentData = {
            comment_text: comment?.commentText,
            rateing: comment?.rateing,
        }
        axios
            .post(`https://backend.atlbha.com/api/addComment/${data?.product?.id}`, commentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res?.data?.success === true && res?.data?.data?.status === 200) {
                    toast.success(res?.data?.message?.ar, { theme: 'colored' });
                } else {
                    toast.error(res?.data?.message?.ar, { theme: 'colored' });
                }
            });
    }
    const reviewsList = currentComments?.map((comment, index) => (
        <li key={index} className="reviews-list__item">
            <div className="review">
                <div className="review__avatar"><img src={comment?.user?.image} alt="" /></div>
                <div className=" review__content">
                    <div className=" review__author">{comment?.user?.name}</div>
                    <div className=" review__rating">
                        <Rating value={Number(comment?.rateing)} />
                    </div>
                    <div className=" review__text">{comment?.comment_text}</div>
                    <div className=" review__date">{comment?.created_at}</div>
                </div>
            </div>
        </li>
    ));

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(data?.commentOfProducts?.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="reviews-view">
            <div className="reviews-view__list">
                <h3 className="reviews-view__header">تقييمات العملاء</h3>
                {data?.commentOfProducts?.length > 0 ? (
                    <div className="reviews-list">
                        <ol className="reviews-list__content">
                            {reviewsList}
                        </ol>
                        <div className="reviews-list__pagination">
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={data?.commentOfProducts?.length}
                                paginate={paginate}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                )
                    :
                    (
                        <p>لاتوجد تعليقات لحد الان</p>
                    )}
            </div>

            <form className="reviews-view__form">
                <h3 className="reviews-view__header">أضف تقييمك</h3>
                <div className="row">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="review-stars">أختر عدد النجوم</label>
                                <select value={comment?.rateing} onChange={(e) => setComment({ ...comment, rateing: e.target.value })} id="review-stars" className="form-control">
                                    <option value={5}>تقييم 5 نجوم</option>
                                    <option value={4}>تقييم 4 نجوم</option>
                                    <option value={3}>تقييم 3 نجوم</option>
                                    <option value={2}>تقييم 2 نجوم</option>
                                    <option value={1}>تقييم 1 نجوم</option>
                                </select>
                            </div>
                            {/*<div className="form-group col-md-4">
                                <label htmlFor="review-author">اسمك</label>
                                <input value={comment?.username} onChange={(e) => setComment({ ...comment, username: e.target.value })} type="text" className="form-control" id="review-author" placeholder="اسم المستخدم" />
                            </div>*/}
                            {/*<div className="form-group col-md-4">
                                <label htmlFor="review-email">البريد الاكتروني</label>
                                <input value={comment?.email} onChange={(e) => setComment({ ...comment, email: e.target.value })} type="text" className="form-control" id="review-email" placeholder="البريد الالكتروني" />
                        </div>*/}
                        </div>
                        <div className="form-group">
                            <label htmlFor="review-text">أكتب تقييمك</label>
                            <textarea value={comment?.commentText} onChange={(e) => setComment({ ...comment, commentText: e.target.value })} className="form-control" id="review-text" rows="6" />
                        </div>
                        <div className="form-group mb-0">
                            <button type="button" onClick={handleAddComment} className="btn btn-primary btn-lg">أنشر تقييمك</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductTabReviews;
