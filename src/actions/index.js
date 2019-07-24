export const LESSON_COMPLETED = 'LESSON_COMPLETED';
export const lessonCompleted = id => ({
    type: LESSON_COMPLETED,
    id,
})

export const ACTIVE_LESSON_CHANGED = 'ACTIVE_LESSON_CHANGED'
export const activeLessonChanged = activeLessonId => ({
    type: ACTIVE_LESSON_CHANGED,
    activeLessonId,
})