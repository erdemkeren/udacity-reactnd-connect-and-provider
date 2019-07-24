import './App.css'
import Sider from './components/Sider'
import React  from 'react'
import LessonPage from './pages/Lesson'
import LessonProgress from './components/LessonProgress'
import { connect } from 'react-redux'
import {
    lessonCompleted,
    activeLessonChanged
} from './actions'
import { bindActionCreators } from 'redux'

function App({
    lessonList,
    activeLessonId,
    prevLessonExists,
    nextLessonExists,
    lessonCompleted,
    activeLessonChanged
}) {
    /*
    const onLessonCompletion = id => setLessonList(
        lessonList.map(i => ({ ...i, completed: id === i.id || i.completed }))
    )
    const goToNextLesson = () => setActiveLessonId(
        lessonList[lessonList.findIndex(o => o.id === activeLessonId)+1].id
    )
    const goToPreviousLesson = () => setActiveLessonId(
        lessonList[lessonList.findIndex(o => o.id === activeLessonId)-1].id
    )
    */

    const setActiveLessonId = id => activeLessonChanged(id)
    const goToPreviousLesson = () => activeLessonChanged(
        lessonList[lessonList.findIndex(o => o.id === activeLessonId)-1].id
    )
    const goToNextLesson = () => activeLessonChanged(
        lessonList[lessonList.findIndex(o => o.id === activeLessonId)+1].id
    )
    const onLessonCompletion = id => lessonCompleted(id)

    return (
        <div className="App">
            <Sider>
                <Sider.Item style={{ fontSize: 12 }}>
                    <LessonProgress
                        completedLessons={lessonList.reduce((acc, i) => acc + (i.completed ? 1 : 0), 0)}
                        totalLessons={lessonList.length}
                    />
                </Sider.Item>

                { lessonList.map(lesson => (
                    <Sider.Item
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                    >
                        <span style={{
                            color: lesson.id === activeLessonId ? 'white' : undefined
                        }}>
                            { lesson.title }
                        </span> { lesson.completed && <span>(Done)</span>}
                    </Sider.Item>
                ))}
            </Sider>

            <LessonPage
                activeLesson={lessonList.find(o => o.id === activeLessonId)}
                prevLessonExists={prevLessonExists}
                nextLessonExists={nextLessonExists}
                goToPreviousLesson={goToPreviousLesson}
                onLessonCompletion={onLessonCompletion}
                goToNextLesson={goToNextLesson}
            />
        </div>
    )
}

const mapStateToProps = ({ lessonList, activeLessonId }) => ({
    lessonList,
    activeLessonId,
    prevLessonExists: lessonList[0].id !== activeLessonId,
    nextLessonExists: lessonList[lessonList.length-1].id !== activeLessonId,
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ lessonCompleted, activeLessonChanged }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
