<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try{

            $note = Note::where('user_id', $request->user()->id)->get();
            return response()->json([
                'message' => 'Catatan Berhasil Ditampil',
                'data' => $note
            ], 200);
        } catch (Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoteRequest $request)
    {
        try {
         $validated = $request->safe()->all();


         $validated['user_id'] = $request->user()->id;

         $note = Note::create($validated);
         return response()->json([
            'message' => "Catatan berhasil dibuat",
            'data' => $note
         ], 201);

        } catch (Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
         }
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        try {
            return response()->json([
                'message' => 'Isi Catatan',
                'data' => $note
            ] ,200);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, Note $note)
    {
        try {
            $validated = $request->safe()->all();

            if($note->update($validated)){
                return response()->json([
                    'message' => 'Catatan berhasil diganti',
                    'data' => $note
                ], 200);
            }
            return response()->json([
                'message' => 'Catatan gagal diganti',
               'data' => null
           ], 500);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
         try {
            if($note->delete()){
                return response()->json([
                    'message' => 'Catatan telah terhapus',
                    'data' => null
                ], 200);
            }

            return response()->json([
                'message' => 'Catatan tidak terhapus',
                'data' => null
              ], 500);

        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);

        }
    }
}
