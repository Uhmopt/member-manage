<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $user_id, $user_password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_id, $user_password)
    {
      $this->$user_id = $user_id;
      $this->$user_password = $user_password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('p2p@professional.com')
        ->view('mails.usercreated');
    }
}
