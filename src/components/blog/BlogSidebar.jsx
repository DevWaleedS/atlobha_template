// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// widgets
// import WidgetAboutus from '../widgets/WidgetAboutus';
import WidgetCategories from '../widgets/WidgetCategories';
// import WidgetComments from '../widgets/WidgetComments';
// import WidgetNewsletter from '../widgets/WidgetNewsletter';
import WidgetPosts from '../widgets/WidgetPosts';
import WidgetSearch from '../widgets/WidgetSearch';
import WidgetTags from '../widgets/WidgetTags';

// data stubs
// import comments from '../../data/blogWidgetLatestComments';

export default function BlogSidebar(props) {
    const { position, fetchedData,getSearchData } = props;

    return (
        <div className={`block block-sidebar block-sidebar--position--${position}`}>
            <div className="block-sidebar__item">
                <WidgetSearch getSearchData={getSearchData}/>
            </div>
            {/*<div className="block-sidebar__item">
                <WidgetAboutus />
            </div>*/}
            <div className="block-sidebar__item">
                <WidgetCategories categories={fetchedData?.postCategory} />
            </div>
            <div className="block-sidebar__item">
                <WidgetPosts posts={fetchedData?.lastPosts?.slice(0, 3)} />
            </div>
            {/*<div className="block-sidebar__item">
                <WidgetNewsletter />
            </div>*/}
            {/*<div className="block-sidebar__item">
                <WidgetComments comments={comments.slice(0, 3)} />
            </div>*/}
            <div className="block-sidebar__item">
                <WidgetTags tags={fetchedData?.tags} />
            </div>
        </div>
    );
}

BlogSidebar.propTypes = {
    /**
     * sidebar position (default: 'start')
     * one of ['start', 'end']
     * for LTR scripts "start" is "left" and "end" is "right"
     */
    position: PropTypes.oneOf(['start', 'end']),
};

BlogSidebar.defaultProps = {
    position: 'start',
};
