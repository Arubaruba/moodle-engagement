SELECT
  IF(daysSinceActive >= 10, 0, 100 - daysSinceActive / 10 * 100)