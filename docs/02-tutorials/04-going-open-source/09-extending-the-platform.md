---
title: "Extending the Platform"
slug: "extending-the-platform"
description: "Learn how to extend the Enjin platform by adding custom features and integrations to meet the unique needs of your blockchain projects."
---
Our platform lets you add your own code to customize it without changing the original code. For example, you can use the `adhocRules` feature in the Beam Mutation to set custom rules. 

One way to use this is by adding a `ValidationRule` to the `ClaimBeamMutation`. This rule limits how many times a user can claim a Beam, based on their IP address and wallet account. It ensures a user can only claim once per IP or account.

When a Beam is claimed, we save the user's IP and wallet account in the database. Using this, we can check if a claim has already been made from that IP or account. If it has, the claim is denied.

First, we create a Laravel `ValidationRule`. Then, we add code to check the `beam_claims` table for the user's IP or account. If it's already there, the claim fails and an error message is shown. This check happens early in the process, stopping claims before they go too far.

```php
<?php

namespace App\Rules;

use Closure;
use Enjin\Platform\Beam\Models\BeamClaim;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Arr;

class ClaimBeamPerUser implements DataAwareRule, ValidationRule
{
    /**
     * All the data under validation.
     *
     * @var array
     */
    protected array $data = [];

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'You have reached the maximum number of times you can claim this Beam.';
    }

    /**
     * Set the data under validation.
     *
     * @param array $data
     *
     * @return $this
     */
    public function setData($data): static
    {
        $this->data = $data;

        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $code = Arr::get($this->data, 'code');
        $cap = 1;

        if (BeamClaim::hasCode($code)
                ->where(
                    fn ($builder) => $builder
                        ->where('wallet_public_key', $value)
                        ->orWhere('ip_address', request()->getClientIp())
                )
                ->count() >= $cap) {

            $fail($this->message());
        }
    }
}
```

In the code, we use a fixed limit (`$cap`) of 1 for claims, but you can make this adjustable by using an environment variable (ENV). This avoids the need for new builds when changing the cap.

After creating the validation rule, add it to the `ClaimBeamMutation` by placing it in the `adhocRules` array. Do this in the `boot()` method of your app's `AppServiceProvider` class. This setup ensures the rule checks the supplied `account` field and its data.

```php
public function boot()
{
    ClaimBeamMutation::$adhocRules = ['account' => [new ClaimBeamPerUser()]];
}
```

This example shows how to add custom rules for extra checks in the Beam package without modifying its core code. You can also include more checks beyond just the user's IP address and wallet account if needed.
