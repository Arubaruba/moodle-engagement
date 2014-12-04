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

ORDER BY score DESC