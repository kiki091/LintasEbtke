<div id="desktop__content">
    
    <nav id='cssmenu'>
        
        <div id="head-mobile"></div>
        <div class="button"></div>
        <ul>
            <li>
                <a href='{{ route('MainPage') }}'>{{ trans('navigation/menu.menu_home')}}</a>
            </li>
            
            <li>
                <a href='#'>{{ trans('navigation/menu.menu_about_us')}}</a>
                <ul>
                    <li>
                        <a href='{{ route('CompanyHistory') }}'>{{ trans('navigation/sub_menu.lintas_history') }}</a>
                        
                    </li>
                    <li>
                        <a href='{{ route('CompanyVisionMission') }}'>{{ trans('navigation/sub_menu.vision_mission') }}</a>
                        
                    </li>
                    <li>
                        <a href='{{ route('CompanyOrganization') }}'>{{ trans('navigation/sub_menu.organization_structure') }}</a>
                        
                    </li>
                    <li>
                        <a href='{{ route('CompanyScope') }}'>{{ trans('navigation/sub_menu.lintas_scope') }}</a>
                        
                    </li>
                </ul>
            </li>


            <li>
                <a href='#'>{{ trans('navigation/menu.menu_news_and_event')}}</a>
                <ul>
                    <li>
                        <a href='{{ route('landingNews') }}'>{{ trans('navigation/sub_menu.news') }}</a>
                        
                    </li>
                    <li>
                        <a href='{{ route('landingEvent') }}'>{{ trans('navigation/sub_menu.events') }}</a>
                        
                    </li>
                </ul>
            </li>

            <li>
                <a href='#'>{{ trans('navigation/menu.menu_investment_services')}}</a>
                <ul>
                    <li>
                        <a href='#'>{{ trans('navigation/sub_menu.procedure') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.potentials') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.green_pages') }}</a>
                        
                    </li>
                </ul>
            </li>

            <li>
                <a href='#'>{{ trans('navigation/menu.menu_information_services')}}</a>
                <ul>
                    <li>
                        <a href='#'>{{ trans('navigation/sub_menu.gheotermal') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.bio_energy') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.others') }}</a>
                        
                    </li>
                </ul>
            </li>

            <li>
                <a href='#'>{{ trans('navigation/menu.menu_renewable_energi')}}</a>
                <ul>
                    <li>
                        <a href='#'>{{ trans('navigation/sub_menu.industry') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.commercial_building') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.transportation') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.residentials') }}</a>
                        
                    </li>
                </ul>
            </li>

            <li>
                <a href='#'>{{ trans('navigation/menu.menu_resource')}}</a>
                <ul>
                    <li>
                        <a href='#'>{{ trans('navigation/sub_menu.tools') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.white_papers') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.publications') }}</a>
                        
                    </li>
                    <li>
                        <a href=''>{{ trans('navigation/sub_menu.featibility_studies') }}</a>
                        
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</div>