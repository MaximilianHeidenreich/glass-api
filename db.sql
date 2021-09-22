-- PING EVENTS
CREATE TABLE `ping_events` (
    `id` bigint NOT NULL AUTO_INCREMENT,
	`time`		datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `page_id`	VARACHAR(255) NOT NULL,
	`client_id`	VARACHAR(50) NOT NULL,
	`ping_data`	TEXT(65500),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE test (id VARCHAR(22) PRIMARY KEY, time	datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6));

CREATE TABLE ping_events (time datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),page_id VARACHAR(255) NOT NULL,client_id VARACHAR(50) NOT NULL,ping_data TEXT(65500),PRIMARY KEY (`page_id`, `client_id`, `time`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE tes5 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `page_id` VARACHAR(255) NOT NULL,
    `client_id` VARACHAR(50) NOT NULL,
	`ping_data` TEXT(65500)
);