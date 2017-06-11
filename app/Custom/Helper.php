<?php
//use Cache;

if(!function_exists('asset'))
{
	function asset($path, $secure = null)
	{
		$config = config('ebtkeassets');
		$arr_elixir = array('js');
		if($config['subdomain'])
		{
			 // Check cache first
	        $urls = Cache::tags($config['key'])->get(md5($path));
	        if ($urls != null) {
	            return $urls;
	        }
	        //
			$assetName = basename($path);
			// Remove query string
		    $assetName = explode("?", $assetName);
		    $assetName = $assetName[0];




			$file_slices = explode('.', $assetName);
			$ext = $file_slices[count($file_slices)-1];
			switch (env('APP_ENV')) {
				case 'live':
				case 'beta':
					$env = env('APP_ENV');
					break;
				
				default:
					$env = 'local';
					break;
			}
			$parsing = $config['parsing'][$env];

			$list_domain = array();
			foreach ($parsing as $key => $obj) {
				$parse_key_ext = explode('|', $key);
				if(in_array(strtolower($ext), $parse_key_ext))
				{
					$list_domain = $obj;
					break;
				}
			}
			if(count($list_domain))
			{
				if(count($list_domain)>1)
					$sub = $list_domain[array_rand($list_domain)];
				else
					$sub = $list_domain[0];

				if(in_array(strtolower($ext), $arr_elixir))
					$path = elixir($path);

				$url = $sub.".".env('APP_DOMAIN');
				$url = "//" . rtrim($url, "/") . "/" . ltrim( $path, "/");
				if ($secure) $url = "https:".$url;
				else $url = "http:".$url;

				//set the cache
				Cache::tags($config['key'])->put(md5($path), $url, $config['expiry_time']);
				return  $url;
			}
			else return app('url')->asset($path, $secure); 

			
		}
		else
			return app('url')->asset($path, $secure);
		
	    
	}

}
if(!function_exists('ebtke_str_slug'))
{
	function ebtke_str_slug($string, $glue = '-')
	{
	    $string = preg_replace('/[-\s]+/', $glue, $string);
	    return trim($string, $glue);
	}
}

if(!function_exists('ebtke_split_time'))
{
	function ebtke_split_time($date, $key_time)
	{
		$time = array(substr($key_time,0,2),substr($key_time,2));
		$time = implode(":", $time);
		return date('Y-m-d', strtotime($date))." ".$time;
	}
}

if(!function_exists('jsonStringToArray'))
{
	function jsonStringToArray($json)
	{
		return json_decode($json, true);
	}
}

if(!function_exists('mysqlDateTimeFormat'))
{
	function mysqlDateTimeFormat($date = '', $strtotime = false)
	{
		if (empty($date)) {
			return date('Y-m-d H:i:s');
		} else {
			if ($strtotime) {
				return date('Y-m-d H:i:s', $date);
			} else {
				return date('Y-m-d H:i:s', strtotime($date));
			}
		}
	}
}

if(!function_exists('striptags'))
{
	function striptags($str)
	{ 	
		echo html_entity_decode(strip_tags($str));
	}
}
?>