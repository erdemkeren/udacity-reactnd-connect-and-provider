import React from 'react'
import {
    LESSON_COMPLETED,
    ACTIVE_LESSON_CHANGED
} from '../actions'

const initialState = {
    activeLessonId: 1,
    lessonList: [{
        id: 1,
        title: 'Lesson 1',
        completed: true,
        type: 'content',
        content: (
            <>
                <p>React rocks!</p>
            </>
        )
    }, {
        id: 2,
        title: 'Quiz 1',
        completed: false,
        type: 'quiz',
        content: (
            <>
                <p>What rocks?</p>
                <ul>
                    <li>React</li>
                    <li>Angular</li>
                    <li>Ember</li>
                    <li>Vue</li>
                </ul>
            </>
        )
    }, {
        id: 3,
        title: 'Assessment 1',
        completed: false,
        type: 'assessment',
        content: (
            <>
                <p>Find a library that rocks.</p>
                <em>Deadline: One week</em>
            </>
        )
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LESSON_COMPLETED:
            return {
                ...state,
                lessonList: state.lessonList.map(i => ({ ...i, completed: action.id === i.id || i.completed }))
            };
        case ACTIVE_LESSON_CHANGED:
            return {
                ...state,
                activeLessonId: action.activeLessonId,
            }
        default:
            return state
    }
}

export default reducer;