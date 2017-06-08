<?php

namespace App\Custom;

use LaravelLocalization;

class EbtkeHelper
{
	public function getCurrentLanguageKey()
	{
		$currentLocale  = LaravelLocalization::getCurrentLocale();
        return $currentLocale;
	}

	public function getDayNow()
	{
		date_default_timezone_set('Asia/Jakarta');

		$date = date('d M Y');
		$tanggal = date('d');
		$year 	= date('Y');

		$day = date('D', strtotime($date));
		$month = date('M', strtotime($date));
		
		if($this->getCurrentLanguageKey() == "id") {
			$dayList = array(
				'Sun' => 'Minggu',
				'Mon' => 'Senin',
				'Tue' => 'Selasa',
				'Wed' => 'Rabu',
				'Thu' => 'Kamis',
				'Fri' => 'Jumat',
				'Sat' => 'Sabtu'
			);
			$monthList = array(
				'Jan' => 'Januari',
				'Feb' => 'Februari',
				'Mar' => 'Maret',
				'Apr' => 'April',
				'Mei' => 'Mei',
				'Jun' => 'Juni',
				'Jul' => 'Juli',
				'Ags' => 'Agustus',
				'Sep' => 'September',
				'Okt' => 'Oktober',
				'Nov' => 'November',
				'Des' => 'Desember',
			);

		} elseif($this->getCurrentLanguageKey() == "da") {
			$dayList = array(
				'Sun' => 'Søndag',
				'Mon' => 'Mandag',
				'Tue' => 'Tirsdag',
				'Wed' => 'Onsdag',
				'Thu' => 'Torsdag',
				'Fri' => 'Fredag',
				'Sat' => 'Lørdag'
			);
			$monthList = array(
				'Jan' => 'Januar',
				'Feb' => 'Februar',
				'Mar' => 'Marts',
				'Apr' => 'April',
				'Mei' => 'Kan',
				'Jun' => 'Juni',
				'Jul' => 'Juli',
				'Ags' => 'August',
				'Sep' => 'September',
				'Okt' => 'October',
				'Nov' => 'November',
				'Des' => 'December',
			);
		} else {

			$dayList = array(
				'Sun' => 'Sunday',
				'Mon' => 'Monday',
				'Tue' => 'Tuesday',
				'Wed' => 'Wednesday',
				'Thu' => 'Thursday',
				'Fri' => 'Friday',
				'Sat' => 'Saturday'
			);
			$monthList = array(
				'Jan' => 'January',
				'Feb' => 'February',
				'Mar' => 'March',
				'Apr' => 'April',
				'Mei' => 'May',
				'Jun' => 'June',
				'Jul' => 'July',
				'Ags' => 'August',
				'Sep' => 'September',
				'Okt' => 'October',
				'Nov' => 'November',
				'Des' => 'December',
			);
		}

		return $dayList[$day].", ".$tanggal." ".$monthList[$month]." ".$year;
	}
}