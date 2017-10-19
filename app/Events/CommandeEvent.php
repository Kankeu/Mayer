<?php

namespace App\Events;


use App\Article;
use App\Panier;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CommandeEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @params array panier
     */

    public $commande;

    /**
     * Create a new event instance.
     *
     * @param Panier $commande
     */
    public function __construct(array $commande)
    {
        $this->commande = $commande;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        $id = Article::find($this->commande['commande']->article_id)->user_id;
        return new PrivateChannel("channel.commande.$id");
    }
}
