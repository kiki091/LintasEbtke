<?php

return [
    'subdomain' => (env('APP_ENV') == 'live' || env('APP_ENV') == 'beta') ? true : false,
    'parsing' => 
    	array(
    		'beta' => array(
	            'js|css' => array('betaasset1','betaasset2'),
	            'png|jpg|jpeg|gif|png|bpg|svg' => array('betaimg1','betaimg2','betaimg3','betaimg4'),
            ),
            'live' => array(
	            'js|css' => array('asset1','asset2'),
	            'png|jpg|jpeg|gif|png|bpg|svg' => array('img1','img2','img3','img4'),
            ),
            'local' => array(
	            'js|css' => array('asset1','asset2'),
	            'png|jpg|jpeg|gif|png|bpg|svg' => array('img1','img2','img3','img4'),
            ),
        ),
    'key' => 'assetsurl',
    'expiry_time' => 360, //in minutes
];
