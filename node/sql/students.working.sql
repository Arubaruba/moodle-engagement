SELECT
  id, email, lastLogin,

  firstname
    as firstName,

  lastname
    as lastName,

  (SELECT DATEDIFF(now(), FROM_UNIXTIME(timemodified)))
    as daysSinceActive,

  (SELECT IF(daysSinceActive >= 10, 0, 100 - daysSinceActive / 10 * 100))
    as score

FROM mdl_user

WHERE
  EXISTS(SELECT 1 FROM mdl_role_assignments WHERE userid = mdl_user.id AND roleid = 5) -- 5 == Student
  AND
  (? IS NULL OR EXISTS(SELECT 1 FROM mdl_user_enrolments WHERE userid = mdl_user.id AND EXISTS(SELECT 1 FROM mdl_enrol WHERE id = enrolid  AND courseid = ? LIMIT 1) LIMIT 1))

ORDER BY score DESC;