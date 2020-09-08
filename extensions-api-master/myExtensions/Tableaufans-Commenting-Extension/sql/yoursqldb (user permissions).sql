# Privileges for `admin`@`%`

GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY PASSWORD '*4ACFE3202A5FF5CF467898FC58AAB1D615029441' WITH GRANT OPTION;


# Privileges for `admin`@`localhost`

GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' IDENTIFIED BY PASSWORD '*4ACFE3202A5FF5CF467898FC58AAB1D615029441' WITH GRANT OPTION;


# Privileges for `readonly`@`%`

GRANT SELECT ON *.* TO 'readonly'@'%' IDENTIFIED BY PASSWORD '*922A4B420903CAD4E7FC56A23122AB927E051FE3';

GRANT SELECT ON `yoursqldb`.* TO 'readonly'@'%';


# Privileges for `readonly`@`localhost`

GRANT SELECT ON *.* TO 'readonly'@'localhost' IDENTIFIED BY PASSWORD '*922A4B420903CAD4E7FC56A23122AB927E051FE3';

GRANT SELECT ON `yoursqldb`.* TO 'readonly'@'localhost';


# Privileges for `root`@`127.0.0.1`

GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;


# Privileges for `root`@`::1`

GRANT ALL PRIVILEGES ON *.* TO 'root'@'::1' WITH GRANT OPTION;


# Privileges for `root`@`localhost`

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;

GRANT PROXY ON ''@'%' TO 'root'@'localhost' WITH GRANT OPTION;