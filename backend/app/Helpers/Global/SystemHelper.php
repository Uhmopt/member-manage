<?php

if (! function_exists('includeFilesInFolder')) {
    /**
     * Loops through a folder and requires all PHP files
     * Searches sub-directories as well.
     *
     * @param $folder
     */
    function includeFilesInFolder($folder)
    {
        try {
            $rdi = new RecursiveDirectoryIterator($folder);
            $it = new RecursiveIteratorIterator($rdi);

            while ($it->valid()) {
                if (! $it->isDot() && $it->isFile() && $it->isReadable() && $it->current()->getExtension() === 'php') {
                    require $it->key();
                }

                $it->next();
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}

if (! function_exists('includeRouteFiles')) {

    /**
     * @param $folder
     */
    function includeRouteFiles($folder)
    {
        includeFilesInFolder($folder);
    }
}

if(! function_exists('convert_date_format'))
{

/**
 * Convert date format.
 *
 * Use regular expressions to detect dates and convert the detected dates into a MySQL-compatible DATE format.
 *
 * @link https://imelgrat.me/php/date-formatting-detect-convert/
 */
	function convert_date_format($old_date = '')
	{
		$old_date = trim($old_date);

		if (preg_match('/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/', $old_date)) // MySQL-compatible YYYY-MM-DD format
		{
			$new_date = $old_date;
		}
		elseif (preg_match('/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/', $old_date)) // DD-MM-YYYY format
		{
			$new_date = substr($old_date, 6, 4) . '-' . substr($old_date, 3, 2) . '-' . substr($old_date, 0, 2);
		}
		elseif (preg_match('/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{2}$/', $old_date)) // DD-MM-YY format
		{
			$new_date = substr($old_date, 6, 4) . '-' . substr($old_date, 3, 2) . '-20' . substr($old_date, 0, 2);
		}
		else // Any other format. Set it as an empty date.
		{
			$new_date = '0000-00-00';
		}
		return $new_date;
	}
}
