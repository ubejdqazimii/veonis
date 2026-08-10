<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Article')
                ->columns(2)
                ->schema([
                    TextInput::make('title')->required()->columnSpanFull(),
                    TextInput::make('slug')->required(),
                    Select::make('locale')->options(['de' => 'Deutsch', 'en' => 'English'])->required(),
                    TextInput::make('category')->required(),
                    TextInput::make('read_time')->label('Reading time'),
                    Textarea::make('excerpt')->required()->rows(4)->columnSpanFull(),
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('blog')
                        ->visibility('public'),
                    TextInput::make('image_alt')->label('Image alt text'),
                    Toggle::make('is_published')->label('Published'),
                    DateTimePicker::make('published_at')->seconds(false),
                ]),
            Section::make('Article content')
                ->schema([
                    Repeater::make('intro')
                        ->simple(Textarea::make('text')->rows(3)->required())
                        ->addActionLabel('Add introduction paragraph'),
                    Repeater::make('sections')
                        ->schema([
                            TextInput::make('title')->required(),
                            Repeater::make('paragraphs')
                                ->simple(Textarea::make('text')->rows(4)->required())
                                ->addActionLabel('Add paragraph'),
                        ])
                        ->collapsible()
                        ->cloneable()
                        ->addActionLabel('Add article section'),
                    Repeater::make('takeaways')
                        ->simple(TextInput::make('text')->required())
                        ->addActionLabel('Add takeaway'),
                ]),
        ]);
    }
}
