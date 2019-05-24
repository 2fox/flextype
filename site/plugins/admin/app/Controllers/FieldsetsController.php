<?php

namespace Flextype;

use Flextype\Component\Arr\Arr;
use Flextype\Component\Text\Text;
use function Flextype\Component\I18n\__;

class FieldsetsController extends Controller
{
   public function index($request, $response, $args)
   {
       return $this->view->render($response,
                                  'plugins/admin/views/templates/extends/fieldsets/index.html', [
           'menu_item' => 'fieldsets',
           'fieldsets_list' => $this->fieldsets->fetchList(),
           'links' =>  [
                            'fieldsets' => [
                                'link' => $this->router->pathFor('admin.fieldsets.index'),
                                'title' => __('admin_fieldsets'),
                                'attributes' => ['class' => 'navbar-item active']
                            ],
                        ],
            'buttons' => [
                            'fieldsets_add' => [
                                'link' => $this->router->pathFor('admin.fieldsets.add'),
                                'title' => __('admin_create_new_fieldset'),
                                'attributes' => ['class' => 'float-right btn']
                            ]
                         ]
       ]);
   }

   public function add($request, $response, $args)
   {
       return $this->view->render($response,
                                  'plugins/admin/views/templates/extends/fieldsets/add.html', [
           'menu_item' => 'fieldsets',
           'fieldsets_list' => $this->fieldsets->fetchList(),
           'links' =>  [
                            'fieldsets' => [
                                'link' => $this->router->pathFor('admin.fieldsets.index'),
                                'title' => __('admin_fieldsets'),
                                'attributes' => ['class' => 'navbar-item active']
                            ],
                        ],
            'buttons' => [
                            'fieldsets_add' => [
                                'link' => $this->router->pathFor('admin.fieldsets.add'),
                                'title' => __('admin_create_new_fieldset'),
                                'attributes' => ['class' => 'float-right btn']
                            ]
                         ]
       ]);
   }

   public function addProcess($request, $response, $args)
   {
        $data = $request->getParsedBody();

        Arr::delete($data, 'csrf_name');
        Arr::delete($data, 'csrf_value');

        $id = Text::safeString($data['name'], '-', true);
        $data = ['title' => $data['title']];

        if ($this->fieldsets->create($id, $data)) {
            $this->flash->addMessage('success', __('admin_message_fieldset_created'));
        } else {
            $this->flash->addMessage('error', __('admin_message_fieldset_was_not_created'));
        }

        return $response->withRedirect($this->container->get('router')->urlFor('admin.fieldsets.index'));
   }

   public function edit($request, $response, $args)
   {

   }

   public function editProcess($request, $response, $args)
   {

   }

   public function rename($request, $response, $args)
   {

   }

   public function renameProcess($request, $response, $args)
   {

   }

   public function deleteProcess($request, $response, $args)
   {

   }

   public function duplicateProcess($request, $response, $args)
   {

   }
}