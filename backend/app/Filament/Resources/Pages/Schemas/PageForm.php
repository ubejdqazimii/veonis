<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Page settings')
                    ->description('Internal identity, URL, SEO and publication state.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')->required()->maxLength(150),
                        Select::make('locale')
                            ->options(['de' => 'Deutsch', 'en' => 'English'])
                            ->required(),
                        TextInput::make('key')
                            ->helperText('Stable frontend key, for example about-veonis.')
                            ->required()
                            ->maxLength(150),
                        TextInput::make('slug')->required()->maxLength(255),
                        TextInput::make('seo_title')->required()->maxLength(255)->columnSpanFull(),
                        Textarea::make('meta_description')->required()->rows(3)->columnSpanFull(),
                        Toggle::make('is_published')->label('Published')->live(),
                        DateTimePicker::make('published_at')->seconds(false),
                    ]),
                Section::make('Hero')
                    ->description('The main heading and calls to action shown at the top of the page.')
                    ->columns(2)
                    ->schema([
                        TextInput::make('eyebrow')->maxLength(150),
                        TextInput::make('title')->required()->maxLength(255),
                        TextInput::make('subtitle')->maxLength(255)->columnSpanFull(),
                        Repeater::make('description')
                            ->simple(Textarea::make('text')->rows(3)->required())
                            ->addActionLabel('Add paragraph')
                            ->columnSpanFull(),
                        TextInput::make('cta')->label('Primary button')->maxLength(150),
                        TextInput::make('secondary_cta')->label('Secondary button')->maxLength(150),
                    ]),
                Section::make('Page sections')
                    ->description('Add, reorder, duplicate or remove structured website sections.')
                    ->schema([
                        Builder::make('sections')
                            ->label('Content')
                            ->blocks([
                                Block::make('section')
                                    ->label(fn (?array $state): string => $state['title'] ?? 'Content section')
                                    ->schema([
                                        TextInput::make('eyebrow')->maxLength(150),
                                        TextInput::make('title')->required()->live(onBlur: true),
                                        Textarea::make('intro')->rows(3),
                                        Repeater::make('paragraphs')
                                            ->simple(Textarea::make('text')->rows(3)->required())
                                            ->addActionLabel('Add paragraph'),
                                        Repeater::make('items')
                                            ->simple(TextInput::make('text')->required())
                                            ->addActionLabel('Add checklist item'),
                                        Repeater::make('content')
                                            ->label('Legal / structured content')
                                            ->schema([
                                                Select::make('type')
                                                    ->options([
                                                        'paragraph' => 'Paragraph',
                                                        'details' => 'Details list',
                                                        'list' => 'Bullet list',
                                                    ])
                                                    ->required(),
                                                Textarea::make('text')->rows(4),
                                                Repeater::make('items')
                                                    ->simple(TextInput::make('text')->required())
                                                    ->addActionLabel('Add item'),
                                            ])
                                            ->collapsible()
                                            ->addActionLabel('Add structured block'),
                                        Repeater::make('cards')
                                            ->columns(2)
                                            ->schema([
                                                TextInput::make('title')->required(),
                                                Textarea::make('text')->rows(3),
                                                TextInput::make('ctaLabel')->label('Button label'),
                                                TextInput::make('href')->label('Button URL'),
                                                FileUpload::make('image')
                                                    ->image()
                                                    ->disk('public')
                                                    ->directory('pages/cards')
                                                    ->visibility('public'),
                                                TextInput::make('imageAlt')->label('Image alt text'),
                                                Toggle::make('profile')->label('Profile card'),
                                            ])
                                            ->addActionLabel('Add card')
                                            ->collapsible(),
                                        Repeater::make('steps')
                                            ->columns(2)
                                            ->schema([
                                                TextInput::make('title')->required(),
                                                Textarea::make('text')->required()->rows(3),
                                            ])
                                            ->addActionLabel('Add process step'),
                                        Textarea::make('note')->rows(2),
                                        TextInput::make('cta')->label('Section button'),
                                    ]),
                            ])
                            ->blockIcons()
                            ->addActionLabel('Add section')
                            ->collapsible()
                            ->cloneable()
                            ->reorderable()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
