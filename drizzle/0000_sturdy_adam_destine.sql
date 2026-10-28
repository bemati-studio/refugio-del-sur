CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`cabin_id` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`nights` integer NOT NULL,
	`guests` integer NOT NULL,
	`total` integer NOT NULL,
	`deposit` integer NOT NULL,
	`guest_name` text NOT NULL,
	`guest_email` text NOT NULL,
	`guest_phone` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`receipt_key` text,
	`receipt_name` text,
	`receipt_type` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `reservations_cabin_dates_idx` ON `reservations` (`cabin_id`,`check_in`,`check_out`);--> statement-breakpoint
CREATE INDEX `reservations_status_idx` ON `reservations` (`status`);