SELECT id, shortname as name
 FROM mdl_course WHERE mdl_course.id =
 (SELECT courseid FROM mdl_enrol WHERE mdl_enrol.id =
  (SELECT enrolid FROM mdl_user_enrolments WHERE userid = ? LIMIT 1)
 LIMIT 1)

ORDER BY name