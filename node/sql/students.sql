SELECT DISTINCT
  mdl_user.id
    as id,

  mdl_user.email
    as email,

  mdl_user.lastLogin
    as lastLogin,

  mdl_user.firstname
    as firstName,

  mdl_user.lastname
    as lastName,

  DATEDIFF(now(), FROM_UNIXTIME(mdl_user.timemodified))
    as daysSinceActive,

  (SELECT IF(daysSinceActive >= 10, 0, 100 - daysSinceActive / 10 * 100))
    as score,

  (
    SELECT DISTINCT GROUP_CONCAT(DISTINCT courseid) FROM mdl_user_enrolments
    LEFT JOIN mdl_enrol ON mdl_enrol.id = enrolid
    WHERE userid = mdl_user.id LIMIT 1
  )
    as course_list

FROM mdl_user

LEFT JOIN mdl_user_enrolments as mdl_user_enrolments_teacher ON mdl_user_enrolments_teacher.userid = ?
LEFT JOIN mdl_enrol as mdl_enrol_teacher ON mdl_enrol_teacher.id = mdl_user_enrolments_teacher.enrolid
LEFT JOIN mdl_course ON mdl_course.id = mdl_enrol_teacher.courseid AND (? = -1 OR mdl_course.id = ?)

LEFT JOIN mdl_user_enrolments ON mdl_user_enrolments.userid = mdl_user.id
LEFT JOIN mdl_enrol ON mdl_enrol.id = mdl_user_enrolments.enrolid AND mdl_enrol.courseid = mdl_course.id

LEFT JOIN mdl_role_assignments ON mdl_role_assignments.userid = mdl_user.id AND mdl_role_assignments.roleid = 5

WHERE mdl_enrol.id IS NOT NULL AND mdl_role_assignments.id IS NOT NULL

ORDER BY score DESC;