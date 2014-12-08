SELECT mdl_course.id, shortname as name FROM mdl_course
lEFT JOIN mdl_user_enrolments ON userid = ?
LEFT JOIN mdl_enrol on mdl_enrol.id = mdl_user_enrolments.enrolid
WHERE mdl_course.id = mdl_enrol.courseid

ORDER BY name
