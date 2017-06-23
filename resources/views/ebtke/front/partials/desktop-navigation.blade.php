<!-- 
   ____  _____ ____  _  _______ ___  ____    _   _ _____    _    ____  _____ ____  
  |  _ \| ____/ ___|| |/ /_   _/ _ \|  _ \  | | | | ____|  / \  |  _ \| ____|  _ \ 
  | | | |  _| \___ \| ' /  | || | | | |_) | | |_| |  _|   / _ \ | | | |  _| | |_) |
  | |_| | |___ ___) | . \  | || |_| |  __/  |  _  | |___ / ___ \| |_| | |___|  _ < 
  |____/|_____|____/|_|\_\ |_| \___/|_|     |_| |_|_____/_/   \_\____/|_____|_| \_\
                                           
-->

<nav id='cssmenu'>
    
    <div id="head-mobile"></div>
    <div class="button"></div>
    <ul class="container">
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
                    <a href="{{ route('InvestmentServicesProcedure') }}">{{ trans('navigation/sub_menu.procedure') }}</a>
                    
                </li>
                <li>
                    <a href="#">{{ trans('navigation/sub_menu.potentials') }}</a>
                    <ul>
                        <li>
                            <a href="{{ route('InvestmentServicesPotentialsGeothermalLanding') }}">
                                {{ trans('navigation/sub_menu.gheotermal') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('InvestmentServicesPotentialsBioEnergy') }}">
                                {{ trans('navigation/sub_menu.bio_energy') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('InvestmentServicesPotentialsOther') }}">
                                {{ trans('navigation/sub_menu.others') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('InvestmentServicesPotentialsEnergyConservation') }}">
                                {{ trans('navigation/sub_menu.energy_conservation') }}
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="{{ route('InvestmentServicesGreenPages') }}">
                        {{ trans('navigation/sub_menu.green_pages') }}
                    </a>
                    
                </li>
            </ul>
        </li>

        <li>
            <a href='#'>{{ trans('navigation/menu.menu_information_services')}}</a>
            <ul>
                <li>
                    <a href='#'>{{ trans('navigation/sub_menu.renewable_energi')}}</a>
                    <ul>
                        <li>
                            <a href="{{ route('IndusrtiLanding') }}">
                                {{ trans('navigation/sub_menu.industry') }}
                            </a>
                            
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
            <a href='#'>{{ trans('navigation/menu.menu_resource')}}</a>
            <ul>
                <li>
                    <a href="{{ route('Tools') }}">{{ trans('navigation/sub_menu.tools') }}</a>
                    
                </li>
                <li>
                    <a href="{{ route('WhitePapers') }}">{{ trans('navigation/sub_menu.white_papers') }}</a>
                    
                </li>
                <li>
                    <a href="">{{ trans('navigation/sub_menu.publications') }}</a>
                    
                </li>
                <li>
                    <a href="">{{ trans('navigation/sub_menu.featibility_studies') }}</a>
                    
                </li>
            </ul>
        </li>

        <li>
            <a href='#'>{{ trans('navigation/menu.menu_link')}}</a>
            <ul>
                <li>
                    <a href='#'>{{ trans('navigation/sub_menu.nreec_institutions') }}</a>
                    
                </li>
                <li>
                    <a href=''>{{ trans('navigation/sub_menu.nreec_resources') }}</a>
                    
                </li>
                <li>
                    <a href=''>{{ trans('navigation/sub_menu.nreec_events') }}</a>
                    
                </li>
            </ul>
        </li>
        <li id="mobile__content">
            <a href='#'>{{ trans('navigation/menu.language_selector')}}</a>
            <ul>
                @foreach(LaravelLocalization::getSupportedLocales() as $localeCode => $properties)
                <li>
                    <a rel="alternate" hreflang="{{$localeCode}}" href="{{LaravelLocalization::getLocalizedURL($localeCode) }}">
                        {{ $properties['native'] }}
                    </a>
                    
                </li>
                @endforeach
            </ul>
        </li>
    </ul>
</nav>