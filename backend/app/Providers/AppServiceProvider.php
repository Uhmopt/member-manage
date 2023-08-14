<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\Resource;
use Hashids\Hashids;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      //check that app is local
      if ($this->app->isLocal()) {
             //if local register your services you require for development
          //  $this->app->register('Barryvdh\Debugbar\ServiceProvider');
       }else{
             //else register your services you require for production
           $this->app['request']->server->set('HTTPS', true);
       }
        $this->app->bind(Hashids::class, function () {
            return new Hashids(env('HASHIDS_SALT'), 10);
        });
    }
}
