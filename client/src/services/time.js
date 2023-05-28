import { DateTime } from "luxon"

export const returnReadableTime = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_FULL)
}

export const returnReadableTimeShort = (time) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_SHORT)
}

export const returnRelativeTime = (time) => {
    return DateTime.fromISO(time).toRelative({base: DateTime.now(), string: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]})
}