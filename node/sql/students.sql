SELECT
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

  IF(daysSinceActive >= 10, 0, 100 - daysSinceActive / 10 * 100)
    as score

FROM mdl_user

LEFT JOIN mdl_user_enrolments as mdl_user_enrolments_teacher ON mdl_user_enrolments_teacher.userid = ?
LEFT JOIN mdl_enrol_teacher ON mdl_enrol_teacher.id = mdl_user_enrolments_teacher.enrolid
LEFT JOIN mdl_course ON mdl_course.id = mdl_enrol_teacher.courseid AND (? IS NULL OR mdl_course.id = ?)

LEFT JOIN mdl_user_enrolments ON mdl_user_enrolments.userid = mdl_user.id
LEFT JOIN mdl_enrol ON mdl_enrol.id = mdl_user_enrolments.enrolid AND mdl_enrol.courseid = mdl.course.id

LEFT JOIN mdl_role_assignments ON mdl_role_assignments.userid = mdl_user.id AND mdl_role_assignments.roleid = 5


WHERE EXISTS(mdl_enrol.id) AND EXISTS(mdl_role_assignments.id)

ORDER BY score DESC;