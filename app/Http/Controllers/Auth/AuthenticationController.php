<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    public function Login(LoginRequest $request){

        try {
            $validated = $request->safe()->all();

            if(!Auth::attempt($validated)){
                return response()->json([
                    'message' => "Salah masuk email atau password",
                    'data' => null
                ], 401);
            }

            $user = $request->user();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Berhasil Login!!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'access_token' => $token
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                    'message' => $e->getMessage(),
                    'data' => null
                ], 500);
        }
    }

    public function Register(RegisterRequest $request){

        try {
            $validated = $request->safe()->all();

            $passwordHash = Hash::make($validated['password']);

            $validated['password'] = $passwordHash;

            $response = User::create($validated);

            if($response) {
                return response()->json([
                    'message' => 'Register User berhasil dibuat',
                    'data' => null
                ], 201);
            }
        } catch (Exception $e) {
           return response()->json([
                    'message' => $e->getMessage(),
                    'data' => null
                ], 500);
        }
    }

    public function Logout(Request $request){
        try{
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Anda berhasil logout',
                'data' => null
            ], 200);
        } catch (Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
