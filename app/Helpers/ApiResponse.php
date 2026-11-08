<?php

namespace App\Helpers;

use Exception;

class ApiResponse
{
    private int $status;
    private string $message;
    private mixed $data;

    public function __construct(
        int $status,
        string $message,
        mixed $data = null
    ) {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
    }

    public static function success(
        string $message,
        mixed $data = null,
        int $status = 200
    ): self {
        return new self($status, $message, $data);
    }

    public static function error(
        string $message,
        int $status = 400
    ): self {
        return new self($status, $message);
    }

    public function toArray(): array
    {
        return [
            'status' => $this->status,
            'message' => $this->message,
            'data' => $this->data,
        ];
    }

    public function toJsonResponse()
    {
        return response()->json([
            'status' => $this->status,
            'message' => $this->message,
            'data' => $this->data,
        ], $this->status);
    }

    public static function getValidatedStatusCode(Exception $e): int
    {
        return $e->getCode() >= 100 && $e->getCode() < 600
            ? $e->getCode()
            : 400;
    }
}
