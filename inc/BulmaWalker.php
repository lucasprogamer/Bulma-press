<?php

class BulmaWalker extends \Walker_Nav_Menu
{
    private $cpt; // CPT, is current post a custom post type
    private $archive; // Stores the archive page for current URL


    public function __construct()
    {
        $this->cpt = get_post_type();
        // $this->cpt = in_array($cpt, get_post_types(array('_builtin' => false)));
        $this->archive = get_post_type_archive_link($this->cpt);
    }

    public function start_lvl(&$output, $depth = 0, $args = array())
    {
        $output .= '';
    }
    public function end_lvl(&$output, $depth = 0, $args = array())
    {
        $output .= '';
    }
    public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        if ($this->hasChildren($item)) {
            $output .= $this->startDropdownButton($item);
        } else {
            $output .= $this->getLinkButton($item);
        }
    }
    public function end_el(&$output, $item, $depth = 0, $args = array())
    {
        if ($this->hasChildren($item)) {
            $output .= $this->endDropdownButton($item);
        } else {
            $output .= '';
        }
    }
    public function hasChildren($item)
    {
        if (in_array("menu-item-has-children", $item->classes)) {
            return true;
        }
        return false;
    }

    public function getLinkButton($item)
    {

        $class_names = '';
        $url  = ($item->url !== null) ? $item->url : '' ;
        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $class_title_page = sanitize_title($item->title);

        if ($this->archive) {
            $archive = ($this->archive) ? parse_url($this->archive)['path']: '/';
            $urlParse =  isset(parse_url($url)['path']) ? parse_url($url)['path'] : $url ;

            if (is_singular($this->cpt) && strpos($urlParse, $archive ) !== false) {
                  $class_names .= 'is-active';
            }

        }
        if (in_array('current-menu-item', $classes)) {
            $class_names .= 'is-active';
        }
        $button = sprintf("<a href='%s' class='navbar-item navbar-item-%s %s'>%s</a>", $url, $class_title_page, $class_names, $item->title);
        return $button;
    }
    public function startDropdownButton($item)
    {
        $url  = ($item->url !== null) ? $item->url : $item->url ;
        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $class_title_page = sanitize_title($item->title);
        $class_names = '';
        if (in_array('current-menu-item', $classes)) {
            $class_names .= 'is-active';
        }
        $button = sprintf("<a href='%s' class='navbar-link navbar-link-%s %s'>%s</a>", $url, $class_title_page, $class_names, $item->title);
        $dropdown = sprintf("<div class='navbar-item navbar-item-%s has-dropdown is-hoverable'>%s", $class_title_page, $button);
        $dropdown .= "<div class='navbar-dropdown is-boxed'>";
        return $dropdown;
    }
    public function endDropdownButton($item)
    {
        return "</div></div>";
    }

}
